import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../../core/model/book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BookType} from '../../../../../core/model/bookType';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {HasTimedProgressBar} from '../../../../../shared/has-timed-progress-bar';
@Component({
  selector: 'app-book-edition-list-display',
  templateUrl: './book-edition-list-display.component.html'
})
export class BookEditionListDisplayComponent extends HasTimedProgressBar implements OnInit {
  @Input()
  book: Book = {
    title: '',
    editor: {},
    series: {seriesBookCount: 0, displayName: ''},
    tome: '',
    bookType: '',
    status: 'READ',
  };
  @Output()
  removeBook: EventEmitter<Book> = new EventEmitter<Book>();
  form: FormGroup = this.fb.group({
    title: this.fb.control(''),
    tome: this.fb.control('', Validators.min(0)),
    bookType: this.fb.control(''),
    status: this.fb.control(''),
  });
  bookTypes: Observable<BookType[]> = this.bookTypeService.bookTypes;
  constructor(private fb: FormBuilder,
              private bookTypeService: BookTypeService,
              private bookAdministrationService: BookAdministrationService) {
    super();
  }
  ngOnInit() {
    this.init();
  }
  submit(): void {
    this.progressBarState = {display: true, type: 'indeterminate'};
    Object.keys(this.form.value).forEach(key => this.book[key] = this.form.value[key]);
    this.bookAdministrationService.update(this.book).subscribe(value => {
      this.bookTypeService.getAllBookType();
      this.book = value;
      this.updateIsSaved();
      this.hideProgressBar();
    });
  }
  initForm(): void {
    this.form.setValue({
      title: this.book.title,
      tome: this.book.tome,
      bookType: this.book.bookType,
      status: this.book.status
    });
  }
  deleteBook() {
    this.removeBook.emit(this.book);
  }
}
