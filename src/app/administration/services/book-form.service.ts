import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuthorForm} from '../models/form/author-form.model';
import {AuthorImpl} from '../../core/model/impl/author-impl';
import {BookForm} from '../models/form/book-form.model';
import {BookImpl} from '../../core/model/impl/book-impl';
import {Book} from '../../core/model/book';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookFormService {
  private bookForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(new BookForm(new BookImpl())))
  get bookForm$(): Observable<FormGroup> {
    return this.bookForm.asObservable();
  }
  constructor(private fb: FormBuilder) {
  }
  initForm(book: Book) {
    this.bookForm.next(this.fb.group(new BookForm(book)));
  }
  addAuthor() {
    const book = this.bookForm.getValue();
    const authors = book.get('authors') as FormArray;
    authors.push(
      this.fb.group(
        new AuthorForm(new AuthorImpl())
      )
    );
    this.bookForm.next(book);
  }
  toggleOneShot(){
    console.log('to be implemented');
  }
  deleteAuthor(i: number) {
    const book = this.bookForm.getValue();
    const currentAuthors = book.get('Authors') as FormArray;
    currentAuthors.removeAt(i);
    this.bookForm.next(book);
  }
}
