import { TestBed } from '@angular/core/testing';
import { SeriesAdministrationService } from './series-administration.service';
import {Type} from '@angular/core';
describe('SeriesAdministrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: SeriesAdministrationService = TestBed.get(SeriesAdministrationService as Type<SeriesAdministrationService>);
    expect(service).toBeTruthy();
  });
});
