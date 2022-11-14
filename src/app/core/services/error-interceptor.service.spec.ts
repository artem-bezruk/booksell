import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error-interceptor.service';
import {Type} from '@angular/core';
describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: ErrorInterceptor = TestBed.get(ErrorInterceptor as Type<ErrorInterceptor>);
    expect(service).toBeTruthy();
  });
});
