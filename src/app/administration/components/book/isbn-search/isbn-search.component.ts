import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-isbn-search',
  templateUrl: './isbn-search.component.html',
  styleUrls: ['./isbn-search.component.css']
})
export class IsbnSearchComponent implements OnInit {
  public formAddBook: FormGroup;
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private bookService: BookAdministrationService,
              private translateService: TranslateService) {
  }
  ngOnInit() {
    this.formAddBook = this.fb.group({
      isbnCtrl: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^(?:[\d]{10}|[\d]{13})$/)])
    });
  }
  onSubmit() {
    const isbn = this.formAddBook.value.isbnCtrl;
    this.bookService.searchBooks(this.formAddBook.value.isbnCtrl).subscribe(
      () => {
      },
      err => {
        if (err.status === 404) {
          this.snackBar.open(
            this.translateService.instant('BOOK.SEARCH.ERRORS.NO_RESULT_ISBN', {isbn}),
            this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
        } else if (err.status === 401) {
          this.snackBar.open(
            this.translateService.instant('BOOK.SEARCH.ERRORS.NOT_AUTHORIZED', {isbn}),
            this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
        } else {
          this.snackBar.open(
            this.translateService.instant('BOOK.SEARCH.ERRORS.GENERIC'),
            this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
        }
      });
  }
  hasFormatError(control: string) {
    return this.formAddBook.controls[control].hasError('pattern') && !this.hasRequiredError(control);
  }
  hasRequiredError(control: string) {
    return this.formAddBook.controls[control].hasError('required');
  }
}
