import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../services/book.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-isbn-search',
  templateUrl: './isbn-search.component.html',
  styleUrls: ['./isbn-search.component.css']
})
export class IsbnSearchComponent implements OnInit {
  public formAddBook: FormGroup;
  public isbnCtrl: FormControl;
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private bookService: BookService) {
  }
  ngOnInit() {
    this.isbnCtrl = this.fb.control('9791026813712', [
      Validators.required,
      Validators.pattern(/^(?:[\d]{10}|[\d]{13})$/)]);
    this.formAddBook = this.fb.group({
      isbnCtrl: this.isbnCtrl
    });
  }
  onSubmit() {
    this.bookService.searchBooks(this.isbnCtrl.value).subscribe(
      () => {},
      err => {
        if (err.status === 404) {
          this.snackBar.open('The ISBN ' + this.isbnCtrl.value + ' doesn\'t correspond to any book.');
        } else if (err.status === 401) {
          this.snackBar.open('You\'re not authorized to search book with ISBN, please log in.');
        }
      });
  }
}
