import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {NgxTranslateTestingModule} from '../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MockLoaderImgComponent} from '../../../../shared/loader-img/__mocks__/loader-img.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../services/__mocks__/book-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFormComponent, MockLoaderImgComponent ],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatListModule
      ],
      providers: [
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
