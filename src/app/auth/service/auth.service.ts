import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_TOKEN_COOKIE_NAME = 'access_token';
  constructor(
    private router: Router, private http: HttpClient, private cookieService: CookieService) {
  }
  obtainAccessToken(username, password): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${window.btoa('dummy-client-id:dummy-client-secret')}`);
    const observable = this.http.post('/oauth/token', params, {headers}).pipe(shareReplay());
    observable.subscribe(
      data => this.saveToken(data),
      err => console.error('Invalid Credentials: ', err));
    return observable;
  }
  saveToken(token) {
    console.log(token);
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set(AuthService.AUTH_TOKEN_COOKIE_NAME, token.access_token, expireDate);
    this.router.navigate(['/']);
  }
  checkCredentials() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }
  logout() {
    this.cookieService.delete(AuthService.AUTH_TOKEN_COOKIE_NAME);
    this.router.navigate(['/']);
  }
  isAuthenticated() {
    return this.cookieService.check(AuthService.AUTH_TOKEN_COOKIE_NAME);
  }
}
