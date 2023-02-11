import { TestBed } from '@angular/core/testing';
import { BookListService } from './book-list.service';
import {Type} from '@angular/core';
describe('BookListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookListService = TestBed.inject(BookListService as Type<BookListService>);
    expect(service).toBeTruthy();
  });
});
