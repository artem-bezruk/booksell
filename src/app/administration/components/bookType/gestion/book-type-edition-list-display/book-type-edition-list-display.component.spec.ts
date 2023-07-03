import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {BookTypeEditionListDisplayComponent} from './book-type-edition-list-display.component';
describe('BookTypeEditionListDisplayComponent', () => {
  let component: BookTypeEditionListDisplayComponent;
  let fixture: ComponentFixture<BookTypeEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTypeEditionListDisplayComponent],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatListModule,
        MatInputModule,
        MatBadgeModule
      ],
      providers: [
        {provide: BookTypeAdministrationService, useValue: bookTypeAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeEditionListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
