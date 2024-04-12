import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { httpInterceptor } from "./auth/interceptors/http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};
