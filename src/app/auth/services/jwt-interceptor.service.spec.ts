import {TestBed} from '@angular/core/testing';
import {JwtInterceptorService} from './jwt-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Type} from '@angular/core';
describe('JwtInterceptorService', () => {
  let httpTestingController: HttpTestingController;
  let service: JwtInterceptorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(JwtInterceptorService as Type<JwtInterceptorService>);
  });
  afterEach(() => httpTestingController.verify());
  describe('Init test', () => {
    test('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
