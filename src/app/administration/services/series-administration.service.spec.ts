import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SeriesAdministrationService} from './series-administration.service';
describe('SeriesAdministrationService', () => {
  let httpTestingController: HttpTestingController;
  let service: SeriesAdministrationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SeriesAdministrationService);
  });
  afterEach(() => httpTestingController.verify());
  describe('Init test', () => {
    test('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
