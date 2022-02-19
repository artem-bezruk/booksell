import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AdministrationModule} from './administration/administration.module';
import {APP_BASE_HREF} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthModule} from './auth/auth.module';
import {ConfigService} from './core/services/config.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, ObservableInput, of} from 'rxjs';
import {AppConfig} from './core/model/appConfig';
import {JwtInterceptorService} from './auth/services/jwt-interceptor.service';
import {BookModule} from './book/book.module';
export function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('./assets/config/config.json')
        .pipe(
          map((x: AppConfig) => {
            config.setAppConfig(x);
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              resolve(false);
            }
            config.setAppConfig({
              oauth: {
                client_id: 'dummy-client-id',
                client_secret: 'dummy-client-secret'
              }
            });
            resolve(true);
            return of({});
          })
        ).subscribe();
    });
  };
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AdministrationModule,
    BookModule,
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }, {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    HttpClient,
    CookieService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
