import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookDetailsService} from './book-details.service';
import {RouterTestingModule} from '@angular/router/testing';
describe('BookDetailsService', () => {
  let httpTestingController: HttpTestingController;
  let service: BookDetailsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookDetailsService);
  });
  afterEach(() => httpTestingController.verify());
  describe('Init test', () => {
    test('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
