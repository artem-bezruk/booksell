import { TestBed } from '@angular/core/testing';
import { BookDetailsService } from './book-details.service';
import {Type} from '@angular/core';
describe('BookDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookDetailsService = TestBed.get(BookDetailsService as Type<BookDetailsService>);
    expect(service).toBeTruthy();
  });
});
