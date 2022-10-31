import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-isbn-search',
  templateUrl: './isbn-search.component.html',
  styleUrls: ['./isbn-search.component.css']
})
export class IsbnSearchComponent implements OnInit {
  public formAddBook: FormGroup = this.fb.group({
    isbnCtrl: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?:[\d]{10}|[\d]{13})$/)])
  });
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private bookService: BookAdministrationService,
              private translateService: TranslateService) {
  }
  ngOnInit() {
  }
  onSubmit() {
    const isbn = this.formAddBook.value.isbnCtrl;
    this.bookService.searchBooks(this.formAddBook.value.isbnCtrl).subscribe(
      () => {
      },
      err => {
        let message;
        switch (err.status) {
          case 404:
            message = this.translateService.instant('BOOK.SEARCH.ERRORS.NO_RESULT_ISBN', {isbn});
            break;
          case 401:
            message = this.translateService.instant('BOOK.SEARCH.ERRORS.NOT_AUTHORIZED');
            break;
          default:
            message = this.translateService.instant('ERRORS.GENERIC');
        }
        this.openSnackbar(message);
      });
  }
  hasFormatError(control: string) {
    return this.formAddBook.controls[control].hasError('pattern') && !this.hasRequiredError(control);
  }
  hasRequiredError(control: string) {
    return this.formAddBook.controls[control].hasError('required');
  }
  openSnackbar(message: string): void {
    this.snackBar.open(message, this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
  }
}
