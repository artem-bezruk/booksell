import { TestBed } from '@angular/core/testing';
import { SeriesAdministrationService } from './series-administration.service';
import {Type} from '@angular/core';
import {BookTypeAdministrationService} from './book-type-administration.service';
describe('BookTypeAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookTypeAdministrationService = TestBed.inject(BookTypeAdministrationService as Type<BookTypeAdministrationService>);
    expect(service).toBeTruthy();
  });
});
