import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpClient, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../../shared/models/user';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('/oauth/token')) {
      request = this.addAuthToken(request);
      return next.handle(request).pipe(catchError((err) => {
        if (err.status === 401) {
          if (err.error.error_description.includes('Access token expired')) {
            this.authService.refreshToken().pipe(map((data: any) => {
                if (data.status === 200) {
                  return next.handle(this.addAuthToken(request)).pipe(catchError((error) => throwError(error)));
                } else {
                  this.authService.logout();
                }
              }
            ));
          } else {
            this.authService.logout();
          }
        }
        return throwError(err);
      }));
    }
    return next.handle(request);
  }
  private addAuthToken(request: HttpRequest<any>) {
    const currentUser: User | null = this.authService.getCurrentUser();
    if (currentUser) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${currentUser.tokens.access}`}
      });
    }
    return request;
  }
}
