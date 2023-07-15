import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
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
  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Business test', () => {
    test('should return the progress bar value', () => {
      component[`time`] = 4;
      expect(component.getProgressBarValue(4)).toStrictEqual(100);
    });
    test('should call the delete method on service', () => {
      const bookType = {nbBooks: 0, id: 0, name: ''};
      component.bookType = bookType;
      component.deleteBookType();
      expect(bookTypeAdministrationServiceMock.delete).toHaveBeenNthCalledWith(1, bookType);
      expect(bookTypeAdministrationServiceMock.getAll).toHaveBeenCalledTimes(1);
    });
    test('should call the update method on service', () => {
      component.progressBarState = {display: false, type: 'indeterminate'};
      const bookType = {id: 100, name: 'bookTypeName'};
      component.bookType = bookType;
      component.form = new FormGroup({
        name: new FormControl(bookType.name + 'Updated')
      });
      component.submit();
      expect(bookTypeAdministrationServiceMock.update).toHaveBeenNthCalledWith(1, {...bookType, name: bookType.name + 'Updated'});
      expect(component.progressBarState).toStrictEqual({display: false, type: 'indeterminate'});
      expect(component[`_isSaved`]).toBeTruthy();
      expect(component.bookType).toStrictEqual({...bookType, name: bookType.name + 'Updated'});
      expect(bookTypeAdministrationServiceMock.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
