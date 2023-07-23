import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthToken} from '../../shared/models/authToken';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(this.addAuthToken(request)).pipe(catchError((err) => {
      if (request.url.includes('/oauth/token')) {
        if (err.status === 401) {
          this.authService.logout();
        } else {
          return throwError(err);
        }
      }
      if (err.status !== 401) {
        return throwError(err);
      }
      if (this.refreshTokenInProgress) {
        return this.refreshTokenSubject.pipe(
          filter(result => !result),
          take(1),
          switchMap(() => next.handle(this.addAuthToken(request))));
      } else {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(true);
        return this.authService.refreshToken().pipe(switchMap(() => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(false);
          return next.handle(this.addAuthToken(request));
        }));
      }
    }));
  }
  private addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const currentUser: AuthToken | null = this.authService.getAuthToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${currentUser.access}`}
      });
    }
    return request;
  }
}
