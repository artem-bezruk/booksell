import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {ConfigService} from '../../core/services/config.service';
import {OAuthConfig} from '../../core/model/appConfig';
import {SubjectSubscriber} from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_TOKEN_COOKIE_NAME = 'access_token';
  private oauthConfig: OAuthConfig;
  private _isAuthenticated = new BehaviorSubject(null);
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }
  constructor(private router: Router,
              private http: HttpClient,
              private cookieService: CookieService,
              private configService: ConfigService) {
    this.configService.appConfig.subscribe(appConfig => this.oauthConfig = appConfig ? appConfig.oauth : null);
    this.updateAuthenticatedSatus();
  }
  obtainAccessToken(username, password): Observable<any> {
    const oauthAuth = `${this.oauthConfig.client_id}:${this.oauthConfig.client_secret}`;
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${window.btoa(oauthAuth)}`);
    const observable = this.http.post('/auth/oauth/token', params, {headers}).pipe(shareReplay());
    observable.subscribe(
      data => this.saveToken(data),
      err => console.error('Invalid Credentials: ', err));
    return observable;
  }
  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set(AuthService.AUTH_TOKEN_COOKIE_NAME, token.access_token, expireDate);
    this.updateAuthenticatedSatus();
    this.router.navigate(['/']);
  }
  getToken(): any {
    return this.cookieService.get(AuthService.AUTH_TOKEN_COOKIE_NAME);
  }
  logout() {
    this.cookieService.delete(AuthService.AUTH_TOKEN_COOKIE_NAME);
    this.updateAuthenticatedSatus();
    this.router.navigate(['/']);
  }
  private updateAuthenticatedSatus() {
    return this._isAuthenticated.next(this.cookieService.check(AuthService.AUTH_TOKEN_COOKIE_NAME));
  }
}
