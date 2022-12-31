import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../../core/model/book';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {BookType} from '../../../../../core/model/bookType';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {switchMap, takeWhile} from 'rxjs/operators';
import {BookAdministrationService} from '../../../../services/book-administration.service';
@Component({
  selector: 'app-book-edition-list-display',
  templateUrl: './book-edition-list-display.component.html'
})
export class BookEditionListDisplayComponent implements OnInit {
  get isSaved(): Observable<boolean> {
    return this._isSaved;
  }
  constructor(private fb: FormBuilder,
              private bookTypeService: BookTypeService,
              private bookAdministrationService: BookAdministrationService) {
  }
  readonly newBookType = 'new Book type';
  @Input()
  book: Book = {title: '', editor: {}, series: {seriesBookCount: 0, displayName: ''}};
  private time = 3;
  private toogle = new BehaviorSubject(false);
  remainingSeconds = this.toogle.pipe(
    switchMap((running: boolean) => (running ? timer(0, 1000) : of(0))),
    takeWhile(t => t <= this.time),
  );
  progressBarState = {display: false, type: 'determinate'};
  @Output()
  removeBook: EventEmitter<Book> = new EventEmitter<Book>();
  form: FormGroup = this.fb.group({
    title: this.fb.control(''),
    tome: this.fb.control('', Validators.min(0)),
    bookType: this.fb.control(''),
    status: this.fb.control(''),
  });
  bookTypes: Observable<BookType[]> = this.bookTypeService.bookTypes;
  private _isSaved: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getProgressBarValue(val: number) {
    return (val / this.time) * 100;
  }
  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(() => {
      this.progressBarState = {display: true, type: 'determinate'};
      this.toogle.next(true);
    });
    this.remainingSeconds.subscribe((t: number) => {
      if (t === this.time) {
        this.submit();
      }
    });
  }
  submit(): void {
    this.progressBarState = {display: true, type: 'indeterminate'};
    Object.keys(this.form.value).forEach(key => this.book[key] = this.form.value[key]);
    this.bookAdministrationService.updateBooks(this.book).subscribe(value => {
      this._isSaved.next(true);
      setTimeout(() => this._isSaved.next(false), 3000);
      this.book = value;
      this.progressBarState.display = false;
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
