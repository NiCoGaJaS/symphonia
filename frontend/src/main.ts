import { AppComponent } from '@app/app.component';
import { appConfig } from '@config/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err),
);
