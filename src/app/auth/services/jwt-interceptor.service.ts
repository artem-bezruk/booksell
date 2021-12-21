import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      });
    }
    return next.handle(request);
  }
}
