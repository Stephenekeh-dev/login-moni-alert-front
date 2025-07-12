import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtInterceptor } from './interceptors/jwt.interceptor'

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideAnimations(), // Ensure this is correctly imported
    importProvidersFrom(MatSnackBarModule) // Ensure this is correctly imported
  ]
};
