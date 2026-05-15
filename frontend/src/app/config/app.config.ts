import {
    ApplicationConfig,
    LOCALE_ID,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection,
} from '@angular/core';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { CartService } from '@app/services/cart.service';
import { Products } from '@app/api/products/products.api';
import { firstValueFrom } from 'rxjs';
import { providePrimeNG } from 'primeng/config';
import { routes } from './routing/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(withEventReplay()),
        provideAppInitializer(async () => {
            const cartService = inject(CartService);
            const productApi = inject(Products);

            if (!cartService.isBrowser) {
                return;
            }

            const cart = cartService.cart();

            if (cart.length === 0) {
                return;
            }

            const ids = await firstValueFrom(productApi.allIds());

            cartService.pruneToExistingIds(new Set(ids));
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark',
                },
            },
        }),
        { provide: LOCALE_ID, useValue: 'de-DE' },
    ],
};
