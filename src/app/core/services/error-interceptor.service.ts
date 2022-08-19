import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private _refreshToken: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.handle401Error(request, next);
        location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this._refreshToken.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this._refreshToken.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));
    } else {
      return this._refreshToken.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
