import { TestBed } from '@angular/core/testing';
import { BookAdministrationService } from './book-administration.service';
import {Type} from '@angular/core';
describe('BookAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookAdministrationService = TestBed.get(BookAdministrationService as Type<BookAdministrationService>);
    expect(service).toBeTruthy();
  });
});
