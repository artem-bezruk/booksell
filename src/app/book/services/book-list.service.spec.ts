import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookListService} from './book-list.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxTranslateTestingModule} from '../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('BookListService', () => {
  let httpTestingController: HttpTestingController;
  let service: BookListService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxTranslateTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookListService);
  });
  afterEach(() => httpTestingController.verify());
  describe('Init test', () => {
    test('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
