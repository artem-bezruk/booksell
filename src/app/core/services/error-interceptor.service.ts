import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';
import {CoreService} from './core.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public snackBar: MatSnackBar,
              private authService: AuthService,
              private coreService: CoreService,
              private translateService: TranslateService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err) => {
      if (err.status !== 401) {
        this.coreService.updateLoadingState(false);
        this.snackBar.open(this.translateService.instant('ERRORS.GENERIC'), this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
        return throwError(err.error?.message || err.statusText);
      } else {
        return next.handle(request);
      }
    }));
  }
}
