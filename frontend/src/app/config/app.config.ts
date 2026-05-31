import {
    ApplicationConfig,
    LOCALE_ID,
    PLATFORM_ID,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection,
} from '@angular/core';
import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import {
    provideHttpClient,
    withFetch,
    withInterceptors,
} from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { API_ORIGIN } from '@api/api.config';
import Aura from '@primeuix/themes/aura';
import { Cart } from '@app/api/cart/cart.store';
import { CartValidation } from '@app/api/cart/cart.api';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import localeDe from '@angular/common/locales/de';
import { providePrimeNG } from 'primeng/config';
import { routes } from './routing/app.routes';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: API_ORIGIN, useValue: 'http://localhost:8080' },
        provideHttpClient(
            withFetch(),
            withInterceptors([
                (request, next) => {
                    const api = inject(API_ORIGIN);
                    const url = new URL(request.url);

                    if (url.origin === api) {
                        request = request.clone({ withCredentials: true });
                    }

                    return next(request);
                },
            ]),
        ),
        provideHttpClient(withFetch()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(withEventReplay()),
        provideAppInitializer(async () => {
            const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

            if (!isBrowser) {
                return;
            }

            const cart: Cart = inject(Cart);
            const items = cart.getItems();

            if (items.length === 0) {
                return;
            }

            const ids = [...new Set(items.map((item) => item.id))];

            const validation = inject(CartValidation);
            const invalidIds = new Set(
                await firstValueFrom(validation.invalidIds(ids)),
            );

            cart.pruneToExistingIds(invalidIds);
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark',
                },
            },
        }),
        MessageService,
    ],
};
