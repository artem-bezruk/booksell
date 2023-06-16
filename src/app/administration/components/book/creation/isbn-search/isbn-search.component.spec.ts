import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IsbnSearchComponent} from './isbn-search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateServiceMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslatePipeMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {TranslateLoaderMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('IsbnSearchComponent', () => {
  let component: IsbnSearchComponent;
  let fixture: ComponentFixture<IsbnSearchComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsbnSearchComponent,
        TranslatePipeMock],
      imports: [
        MatFormFieldModule,
        NoopAnimationsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        }),
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(IsbnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
