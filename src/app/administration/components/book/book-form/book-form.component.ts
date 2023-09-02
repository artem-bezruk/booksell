import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {DisplayImage} from '../../../../shared/display-image';
import {Subscription} from 'rxjs';
import {FormArray, FormGroup} from '@angular/forms';
import {BookFormService} from '../../../services/book-form.service';
import {Book} from '../../../../core/model/book';
import {BookImpl} from '../../../../core/model/impl/book-impl';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent extends DisplayImage implements OnInit, OnDestroy {
  constructor(private bookAdministrationService: BookAdministrationService,
              private bookFormService: BookFormService) {
    super('/files/search/covers');
  }
  public form: FormGroup;
  private formSub: Subscription;
  public authors: FormArray;
  public editor: FormGroup;
  public series: FormGroup;
  public book: Book = new BookImpl();
  roles = ['scénario', 'dessins', 'couleurs'];
  ngOnInit(): void {
    this.formSub = this.bookFormService.bookForm$
      .subscribe(bookForm => {
        this.form = bookForm;
        this.editor = this.form.get('editor') as FormGroup;
        this.series = this.form.get('series') as FormGroup;
      });
    this.bookAdministrationService.searchResult.subscribe((book) => {
      if (book !== null) {
        this.book = BookImpl.fromBookSearch(book);
        this.bookFormService.initForm(this.book);
      }
    });
  }
  addAuthor() {
    this.bookFormService.addAuthor();
  }
  deleteAuthor(index: number) {
    this.bookFormService.deleteAuthor(index);
  }
  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
  submit() {
    const editor = {...this.book.editor, ...this.form.value.editor}
    const series = {...this.book.series, ...this.form.value.series, editor: editor.name}
    console.log({...this.book, ...this.form.value, series, editor});
  }
}
