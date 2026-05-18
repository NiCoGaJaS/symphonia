import {
    ApplicationConfig,
    LOCALE_ID,
    PLATFORM_ID,
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
import { Cart } from '@app/api/cart/cart.store';
import { CartValidation } from '@app/api/cart/cart.api';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { providePrimeNG } from 'primeng/config';
import { routes } from './routing/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(withEventReplay()),
        provideAppInitializer(async () => {
            const cart: Cart = inject(Cart);
            const cartValidation = inject(CartValidation);
            const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

            if (!isBrowser) {
                return;
            }

            const items = cart.getCart();

            if (items.length === 0) {
                return;
            }

            const ids = [...new Set(items.map((i) => i.id))];
            const invalidIds = new Set(
                await firstValueFrom(cartValidation.invalidIds(ids)),
            );

            cart.pruneToExistingIds(
                new Set(ids.filter((id) => !invalidIds.has(id))),
            );
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
