import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import {Type} from '@angular/core';
describe('BookAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookService = TestBed.inject(BookService as Type<BookService>);
    expect(service).toBeTruthy();
  });
});
