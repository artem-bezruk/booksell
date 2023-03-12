import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ConfigService} from '../../core/services/config.service';
import {AppConfig, OAuthConfig} from '../../core/model/appConfig';
import {User} from '../../shared/models/user';
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
    const localstorage = localStorage.getItem(AuthService.USER_LOCAL_STORAGE_NAME);
    this._currentUser = new BehaviorSubject<User | null>(localstorage ? JSON.parse(localstorage) : null);
  }
  get currentUser(): Observable<User | null> {
    return this._currentUser.asObservable();
  }
  private static USER_LOCAL_STORAGE_NAME = 'current_user';
  private oauthConfig: OAuthConfig | null = null;
  private _currentUser: BehaviorSubject<User | null>;
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
      console.log(window.btoa(oauthAuth));
      const params = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');
      const headers = new HttpHeaders()
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Basic ${window.btoa(oauthAuth)}`);
      const observable = this.http.post('/auth/oauth/token', params, {headers}).pipe(shareReplay());
      observable.subscribe(
        (token: any) => this.saveToken({email: username, tokens: AuthService.mapToken(token)}),
        err => console.error('Invalid Credentials: ', err));
      return observable;
    }
    return new Observable<any>();
  }
  refreshToken(): Observable<any> {
    if (this.oauthConfig !== null) {
      const oauthAuth = `${this.oauthConfig.client_id}:${this.oauthConfig.client_secret}`;
      if (this._currentUser.value && this._currentUser.value.tokens && this._currentUser.value.tokens.refresh) {
        const params = new HttpParams()
          .set('refresh_token', this._currentUser.value.tokens?.refresh)
          .set('grant_type', 'refresh_token');
        const headers = new HttpHeaders()
          .set('Content-type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Basic ${window.btoa(oauthAuth)}`);
        const observable = this.http.post('/auth/oauth/token', params, {headers}).pipe(shareReplay());
        observable.subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.updateToken(data);
            }
          },
          (err) => console.error('Invalid Credentials: ', err));
        return observable;
      }
      return throwError('No current user token to refresh');
    }
    return throwError('OAuth configuration missing');
  }
  saveToken(user: User) {
    localStorage.setItem(AuthService.USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
    this._currentUser.next(user);
    this.router.navigate(['/']);
  }
  getCurrentUser(): User | null {
    return this._currentUser.value;
  }
  logout() {
    localStorage.removeItem(AuthService.USER_LOCAL_STORAGE_NAME);
    this._currentUser.next(null);
    this.router.navigate(['/']);
  }
  updateToken(rawToken: any) {
    if (this._currentUser.value) {
      this.saveToken({...this._currentUser.value, tokens: AuthService.mapToken(rawToken)});
    }
  }
}
