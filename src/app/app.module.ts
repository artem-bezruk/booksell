import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {BookModule} from './book/book.module';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthModule} from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BookModule,
    AuthModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, HttpClient, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
