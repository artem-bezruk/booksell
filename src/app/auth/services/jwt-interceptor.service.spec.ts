import { TestBed } from '@angular/core/testing';
import { JwtInterceptorService } from './jwt-interceptor.service';
import {BookAdministrationService} from '../../administration/services/book-administration.service';
import {Type} from '@angular/core';
describe('JwtInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: JwtInterceptorService = TestBed.get(JwtInterceptorService  as Type<JwtInterceptorService>);
    expect(service).toBeTruthy();
  });
});
