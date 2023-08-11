import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookEditionListDisplayComponent} from './book-edition-list-display.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {bookTypeServiceMock} from '../../../../../core/services/__mocks__/book-type.service';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Book} from '../../../../../core/model/book';
describe('BookEditionListDisplayComponent', () => {
  let component: BookEditionListDisplayComponent;
  let fixture: ComponentFixture<BookEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditionListDisplayComponent],
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
  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Business test', () => {
    test('should return the progress bar value', () => {
      component[`time`] = 8;
      expect(component.getProgressBarValue(2)).toStrictEqual(25);
    });
    test('should call the update method on service', () => {
      component.progressBarState = {display: false, type: 'indeterminate'};
      const book: Book = {
        title: 'MyTitle',
        editor: {},
        series: {seriesBookCount: 0, displayName: ''},
        tome: '',
        bookType: '',
        status: 'READ',
      };
      const updatedTitle = book.title + 'Updated';
      component.book = book;
      component.form = new FormGroup({
        title: new FormControl(updatedTitle),
        tome: new FormControl(book.tome),
        bookType: new FormControl(book.bookType),
        status: new FormControl(book.status)
      });
      component.submit();
      expect(bookAdministrationServiceMock.update).toHaveBeenNthCalledWith(1, {...book, title: updatedTitle});
      expect(component.progressBarState).toStrictEqual({display: false, type: 'indeterminate'});
      expect(component[`isSaved$`]).toBeTruthy();
      expect(component.book).toStrictEqual({...book, title: updatedTitle});
      expect(bookTypeServiceMock.getAllBookType).toHaveBeenCalledTimes(1);
    });
  });
});
