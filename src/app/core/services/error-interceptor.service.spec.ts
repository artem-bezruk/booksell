import {inject, TestBed} from '@angular/core/testing';
import {ErrorInterceptor} from './error-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxTranslateTestingModule} from '../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('ErrorInterceptorService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxTranslateTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        ErrorInterceptor,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpTestingController.verify());
  test('should ...', inject([ErrorInterceptor], (interceptor: ErrorInterceptor) => {
    expect(interceptor).toBeTruthy();
  }));
});
