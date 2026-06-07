import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import localePt from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/guards/auth.interceptor';
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  provideAnimations(),
  provideHttpClient(
    withInterceptors([
      authInterceptor
    ])
  )
  ]
};
