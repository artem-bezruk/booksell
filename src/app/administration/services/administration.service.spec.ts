import { TestBed } from '@angular/core/testing';
import { AdministrationService } from './administration.service';
import {Type} from '@angular/core';
import {Book} from '../../core/model/book';
describe('AdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: AdministrationService<Book> = TestBed.get(AdministrationService as Type<AdministrationService<Book>>);
    expect(service).toBeTruthy();
  });
});
