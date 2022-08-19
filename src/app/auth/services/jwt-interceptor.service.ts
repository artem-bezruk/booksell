import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../../shared/models/user';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser: User = this.authService.getCurrentUser();
    if (currentUser && currentUser.tokens && currentUser.tokens.access) {
      request = this.addToken(request, currentUser.tokens.access);
    }
    return next.handle(request);
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
