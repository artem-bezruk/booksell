import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error-interceptor.service';
import {Type} from '@angular/core';
describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  test('should be created', () => {
    const service: ErrorInterceptor = TestBed.inject(ErrorInterceptor as Type<ErrorInterceptor>);
    expect(service).toBeTruthy();
  });
});
