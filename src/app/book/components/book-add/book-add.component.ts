import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {BookSearch} from '../../models/book-search';
import {BookService} from '../../services/book.service';
import {BehaviorSubject, Observable} from 'rxjs';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  public formAddBook: FormGroup;
  public isbnCtrl: FormControl;
  private _searchResults: BehaviorSubject<BookSearch[]> = new BehaviorSubject([]);
  get searchResults(): Observable<BookSearch[]> {
    return this._searchResults.asObservable();
  }
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private bookService: BookService) {
  }
  ngOnInit() {
    this.isbnCtrl = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?:[\d]{10}|[\d]{13})$/)]);
    this.formAddBook = this.fb.group({
      isbnCtrl: this.isbnCtrl
    });
  }
  onSubmit() {
    this.bookService.searchBooks(this.isbnCtrl.value).subscribe(res => {
      const array = this._searchResults.value;
      array.push(res);
      this._searchResults.next(array);
    });
  }
}
