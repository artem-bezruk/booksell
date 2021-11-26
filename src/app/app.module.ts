import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {BookModule} from './book/book.module';
import {APP_BASE_HREF} from '@angular/common';
import {HomeComponent} from './tmp/home/home.component';
import {PasswordFlowLoginComponent} from './tmp/login/password-flow-login.component';
import {FormsModule} from '@angular/forms';
import {AccountDetailsComponent} from './tmp/account-details/account-details.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {OAuthModule} from 'angular-oauth2-oidc';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PasswordFlowLoginComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BookModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    })
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, HttpClient, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
