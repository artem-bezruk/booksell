import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeCreationListDisplayComponent } from './book-type-creation-list-display.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('BookTypeCreationListDisplayComponent', () => {
  let component: BookTypeCreationListDisplayComponent;
  let fixture: ComponentFixture<BookTypeCreationListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeCreationListDisplayComponent ],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        FontAwesomeTestingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatButtonModule
      ],
      providers: [
        {provide: BookTypeAdministrationService, useValue: bookTypeAdministrationServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeCreationListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
