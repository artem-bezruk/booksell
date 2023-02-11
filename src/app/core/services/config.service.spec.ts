import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import {Type} from '@angular/core';
describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: ConfigService = TestBed.inject(ConfigService as Type<ConfigService>);
    expect(service).toBeTruthy();
  });
});
