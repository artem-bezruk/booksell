import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookEditionListDisplayComponent} from './book-edition-list-display.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {bookTypeServiceMock} from '../../../../../core/services/__mocks__/book-type.service';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('BookEditionListDisplayComponent', () => {
  let component: BookEditionListDisplayComponent;
  let fixture: ComponentFixture<BookEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditionListDisplayComponent ],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        MatListModule
      ],
      providers: [
        {provide: BookTypeService, useValue: bookTypeServiceMock},
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditionListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
