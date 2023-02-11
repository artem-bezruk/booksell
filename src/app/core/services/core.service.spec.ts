import { TestBed } from '@angular/core/testing';
import { CoreService } from './core.service';
import {Type} from '@angular/core';
describe('CoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: CoreService = TestBed.inject(CoreService as Type<CoreService>);
    expect(service).toBeTruthy();
  });
});
