import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../../core/model/book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BookType} from '../../../../../core/model/bookType';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {HasTimedProgressBar} from '../../../../../shared/has-timed-progress-bar';
import {EditorImpl} from '../../../../../core/model/impl/editor-impl';
import {SeriesImpl} from '../../../../../core/model/impl/series-impl';
import {AuthorImpl} from '../../../../../core/model/impl/author-impl';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-book-edition-list-display',
  templateUrl: './book-edition-list-display.component.html'
})
export class BookEditionListDisplayComponent extends HasTimedProgressBar implements OnInit {
  @Input()
  set book(book: Book) {
    this._book = {...book, series: SeriesImpl.fromSeries(book.series)};
  }
  _book: Book = {
    title: '',
    editor: new EditorImpl(),
    series: new SeriesImpl(),
    authors: [new AuthorImpl()],
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
              private bookAdministrationService: BookAdministrationService,
              private translateService: TranslateService,
  ) {
    super();
  }
  ngOnInit() {
    this.init();
  }
  submit(): void {
    this.progressBarState = {display: true, type: 'indeterminate'};
    this.bookAdministrationService.update({...this._book, ...this.form.value}).subscribe(value => {
      this.bookTypeService.getAllBookType();
      this.book = value;
      this.updateIsSaved();
      this.hideProgressBar();
    });
  }
  initForm(): void {
    this.form.setValue({
      title: this._book.title,
      tome: this._book.tome,
      bookType: this._book.bookType,
      status: this._book.status
    });
  }
  deleteBook() {
    this.removeBook.emit(this.book);
  }
  public getInputHeader(): string {
    let displayName = this._book.series.displayName;
    if (this._book.series.isOneShot()) {
      displayName = this.translateService.instant('SERIES.ONE_SHOT');
    }
    return `${this._book.editor.name} - ${displayName}`;
  }
}
