import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFilterComponent } from './list-filter.component';
import {BookService} from '../../services/book.service';
import {bookServiceMock} from '../../services/__mocks__/book.service';
import {BookListService} from '../../services/book-list.service';
import {bookListServiceMock} from '../../services/__mocks__/book-list.service';
import {BookDetailsService} from '../../services/book-details.service';
import {bookDetailsServiceMock} from '../../services/__mocks__/book-details.service';
import {CoreService} from '../../../core/services/core.service';
import {coreServiceMock} from '../../../core/services/__mocks__/core.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateServiceMock} from '../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslatePipeMock} from '../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {TranslateLoaderMock} from '../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('ListFilterComponent', () => {
  let component: ListFilterComponent;
  let fixture: ComponentFixture<ListFilterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFilterComponent,TranslatePipeMock ],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: BookService, useValue: bookServiceMock}
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
