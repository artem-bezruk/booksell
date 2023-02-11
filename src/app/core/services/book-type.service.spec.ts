import { TestBed } from '@angular/core/testing';
import { BookTypeService } from './book-type.service';
import {Type} from '@angular/core';
describe('BookTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookTypeService = TestBed.inject(BookTypeService as Type<BookTypeService>);
    expect(service).toBeTruthy();
  });
});
