import { TestBed } from '@angular/core/testing';
import { SeriesAdministrationService } from './series-administration.service';
describe('SeriesAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: SeriesAdministrationService = TestBed.get(SeriesAdministrationService);
    expect(service).toBeTruthy();
  });
});
