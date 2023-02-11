import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {Type} from '@angular/core';
describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService as Type<AuthService>);
    expect(service).toBeTruthy();
  });
});
