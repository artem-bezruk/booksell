import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {ConfigService} from '../../core/services/config.service';
import {AppConfig, OAuthConfig} from '../../core/model/appConfig';
import {AuthToken} from '../../shared/models/authToken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private http: HttpClient,
              private cookieService: CookieService,
              private configService: ConfigService) {
    this.configService.appConfig.subscribe((appConfig: AppConfig | null) => this.oauthConfig = appConfig ? appConfig.oauth : null);
    const localstorage = localStorage.getItem(AuthService.TOKENS_LOCAL_STORAGE_NAME);
    this._tokens = new BehaviorSubject<AuthToken | null>(localstorage ? JSON.parse(localstorage) : null);
  }
  get tokens(): Observable<AuthToken | null> {
    return this._tokens.asObservable();
  }
  private static TOKENS_LOCAL_STORAGE_NAME = 'tokens';
  private oauthConfig: OAuthConfig | null = null;
  private _tokens: BehaviorSubject<AuthToken | null>;
  static mapToken(token: any): AuthToken {
    return {
      creationDate: new Date(),
      access: token.access_token,
      refresh: token.refresh_token,
      tokenType: token.token_type,
      expiresIn: token.expires_in,
      scope: token.scope
    };
  }
  login(username: string, password: string): Observable<any> {
    if (this.oauthConfig !== null) {
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
        (token: any) => {
          this.saveToken(AuthService.mapToken(token))
          this.router.navigate(['/']);
        },
        err => console.error('Invalid Credentials: ', err));
      return observable;
    }
    return new Observable<any>();
  }
  refreshToken(): Observable<any> {
    if (this.oauthConfig !== null) {
      if (this._tokens.value && this._tokens.value.refresh) {
        const params = new HttpParams()
          .set('refresh_token', this._tokens.value.refresh)
          .set('grant_type', 'refresh_token')
          .set('client_id', `${this.oauthConfig.client_id}`)
          .set('client_secret', `${this.oauthConfig.client_secret}`);
        const headers = new HttpHeaders()
          .set('Content-type', 'application/x-www-form-urlencoded');
        const observable = this.http.post('/auth/oauth/token', params, {headers, observe: 'response'}).pipe(shareReplay());
        observable.subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.updateToken(response.body);
            }
          },
          (err) => console.error('Invalid Credentials: ', err));
        return observable;
      }
      return throwError('No current user token to refresh');
    }
    return throwError('OAuth configuration missing');
  }
  saveToken(authToken: AuthToken) {
    localStorage.setItem(AuthService.TOKENS_LOCAL_STORAGE_NAME, JSON.stringify(authToken));
    this._tokens.next(authToken);
  }
  getAuthToken(): AuthToken | null {
    return this._tokens.value;
  }
  logout() {
    localStorage.removeItem(AuthService.TOKENS_LOCAL_STORAGE_NAME);
    this._tokens.next(null);
    this.router.navigate(['/']);
  }
  updateToken(rawToken: any) {
    if (this._tokens.value) {
      this.saveToken(AuthService.mapToken(rawToken));
    }
  }
  isAuthenticated(): boolean {
    return this._tokens.value !== null;
  }
}
