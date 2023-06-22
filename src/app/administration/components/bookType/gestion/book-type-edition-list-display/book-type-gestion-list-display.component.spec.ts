import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeGestionListDisplayComponent } from './book-type-gestion-list-display.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslateServiceMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslatePipeMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('BookTypeGestionListDisplayComponent', () => {
  let component: BookTypeGestionListDisplayComponent;
  let fixture: ComponentFixture<BookTypeGestionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeGestionListDisplayComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FontAwesomeTestingModule,
        MatProgressBarModule,
        MatListModule,
        MatInputModule,
        MatBadgeModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: BookTypeAdministrationService, useValue: bookTypeAdministrationServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeGestionListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
