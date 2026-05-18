import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { API_ORIGIN } from '@api/api.config';
import { appConfig } from './app.config';
import { serverRoutes } from './routing/app.routes.server';

const serverConfig: ApplicationConfig = {
    providers: [
        { provide: API_ORIGIN, useValue: 'http://backend:8080' },
        provideServerRendering(withRoutes(serverRoutes)),
    ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
