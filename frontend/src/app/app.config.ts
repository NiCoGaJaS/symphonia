import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import Aura from '@primeuix/themes/aura';

import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark',
                },
            },
        }),
    ],
};
