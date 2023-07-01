import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookAddComponent} from './book-add.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {CoreService} from '../../../../../core/services/core.service';
import {MockResultSearchComponent} from '../search-result/__mocks__/mock-result-search.component';
import {MockIsbnSearchComponent} from '../isbn-search/__mocks__/mock-isbn-search.component';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {coreServiceMock} from '../../../../../core/services/__mocks__/core.service';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('BookAddComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookAddComponent,
        MockIsbnSearchComponent,
        MockResultSearchComponent,
      ],
      imports: [
        NgxTranslateTestingModule,
        HttpClientTestingModule,
        MatProgressBarModule,
      ],
      providers: [
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
        {provide: CoreService, useValue: coreServiceMock}
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
