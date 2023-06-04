import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookAddComponent} from './book-add.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {CoreService} from '../../../../../core/services/core.service';
import {MockResultSearchComponent} from '../search-result/__mocks__/mock-result-search.component';
import {MockIsbnSearchComponent} from '../isbn-search/__mocks__/mock-isbn-search.component';
const translateServiceMock = {
  get: jest.fn(() => of('fr'))
};
class BookAdministrationServiceMock {
  public searchResult = of({});
}
class CoreServiceMock {
  public isLoading = of(false);
}
describe('BookAddComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        TranslateModule,
        HttpClientTestingModule
      ],
      declarations: [
        BookAddComponent,
        MockIsbnSearchComponent,
        MockResultSearchComponent
      ],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock},
        {provide: BookAdministrationService, useClass: BookAdministrationServiceMock},
        {provide: CoreService, useClass: CoreServiceMock}
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => httpTestingController.verify());
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
