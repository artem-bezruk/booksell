import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookDetailsService} from './book-details.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxTranslateTestingModule} from '../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('BookDetailsService', () => {
  let httpTestingController: HttpTestingController;
  let service: BookDetailsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxTranslateTestingModule
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
