import { TestBed } from '@angular/core/testing';
import { BookAdministrationService } from './book-administration.service';
describe('BookAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: BookAdministrationService = TestBed.get(BookAdministrationService);
    expect(service).toBeTruthy();
  });
});
