import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {ConfigService} from '../../core/services/config.service';
import {AppConfig, OAuthConfig} from '../../core/model/appConfig';
import {User} from '../../shared/models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static USER_LOCAL_STORAGE_NAME = 'current_user';
  private oauthConfig: OAuthConfig | null = null;
  constructor(private router: Router,
              private http: HttpClient,
              private cookieService: CookieService,
              private configService: ConfigService) {
    this.configService.appConfig.subscribe((appConfig: AppConfig | null) => this.oauthConfig = appConfig ? appConfig.oauth : null);
    this._currentUser = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem(AuthService.USER_LOCAL_STORAGE_NAME) || ''));
  }
  private _currentUser: BehaviorSubject<User | null>;
  get currentUser(): Observable<User | null> {
    return this._currentUser.asObservable();
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
        (data: any) => this.saveToken({email: username, tokens: {access: data.access_token, refresh: data.refresh_token}}),
        err => console.error('Invalid Credentials: ', err));
      return observable;
    }
    return new Observable<any>();
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
  refreshToken(): Observable<any> {
    if (this._currentUser.value !== null && this._currentUser.value.tokens) {
      const email = this._currentUser.value.email;
      return this.http.post('/auth/oauth/token/refresh', {
        refreshToken: this._currentUser.value.tokens.refresh
      }).pipe(tap((tokens: any) => {
        this._currentUser.next({email, tokens: {access: tokens.access_token, refresh: tokens.refresh_token}});
      }));
    }
    return of({});
  }
}
