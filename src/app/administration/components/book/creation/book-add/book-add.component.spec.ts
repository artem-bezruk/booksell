import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookAddComponent} from './book-add.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {CoreService} from '../../../../../core/services/core.service';
import {MockResultSearchComponent} from '../search-result/__mocks__/mock-result-search.component';
import {MockIsbnSearchComponent} from '../isbn-search/__mocks__/mock-isbn-search.component';
import {TranslatePipeMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {TranslateServiceMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslateLoaderMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {BookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {coreServiceMock} from '../../../../../core/services/__mocks__/core.service';
describe('BookAddComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        }),
        HttpClientTestingModule
      ],
      declarations: [
        BookAddComponent,
        MockIsbnSearchComponent,
        MockResultSearchComponent,
        TranslatePipeMock
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: BookAdministrationService, useValue: BookAdministrationServiceMock},
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
