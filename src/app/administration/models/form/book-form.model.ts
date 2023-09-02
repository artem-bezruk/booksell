import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Book} from '../../../core/model/book';
export class BookForm {
  title = new FormControl()
  tome = new FormControl()
  arkId = new FormControl()
  isbn = new FormControl()
  year = new FormControl()
  collection = new FormControl()
  series = new FormGroup({
    name: new FormControl(),
    displayName: new FormControl()
  })
  editor = new FormGroup({
    name: new FormControl()
  })
  authors = new FormArray([])
  constructor(
    book: Book
  ) {
    if (book.title) {
      this.title.setValue(book.title);
    }
    if (book.tome) {
      this.tome.setValue(book.tome);
    }
    if (book.arkId) {
      this.arkId.setValue(book.arkId);
    }
    if (book.isbn) {
      this.isbn.setValue(book.isbn);
    }
    if (book.year) {
      this.year.setValue(book.year);
    }
    if (book.collection) {
      this.collection.setValue(book.collection);
    }
    if (book.series) {
      this.series.setValue({
        name: book.series.name,
        displayName: book.series.displayName
      });
    }
    if (book.editor) {
      this.editor.setValue({
        name: book.editor.name
      });
    }
  }
}
