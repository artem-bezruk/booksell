import {inject, TestBed} from '@angular/core/testing';
import {ErrorInterceptor} from './error-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslateServiceMock} from '../../../../__mocks__/@ngx-translate/core/translate.service.mock';
describe('ErrorInterceptorService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        }),
      ],
      providers: [
        ErrorInterceptor,
        {provide: TranslateService, useClass: TranslateServiceMock},
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpTestingController.verify());
  test('should ...', inject([ErrorInterceptor], (interceptor: ErrorInterceptor) => {
    expect(interceptor).toBeTruthy();
  }));
});
