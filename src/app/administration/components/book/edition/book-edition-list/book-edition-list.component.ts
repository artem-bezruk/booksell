import {Component, OnInit} from '@angular/core';
import {Book} from '../../../../../core/model/book';
import {Observable} from 'rxjs';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {NewBookTypeModalComponent} from '../../shared/new-book-type-modal/new-book-type-modal.component';
import {TranslateService} from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-book-edition-list',
  templateUrl: './book-edition-list.component.html',
  styleUrls:  ['../../../../administration-edition.scss']
})
export class BookEditionListComponent implements OnInit {
  bookList: Observable<Book[]> = this.bookAdministrationService.bookListFiltered;
  readonly newBookType = 'new Book type';
  constructor(private bookAdministrationService: BookAdministrationService,
              private translateService: TranslateService,
              private bookTypeService: BookTypeService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }
  ngOnInit() {
  }
  onBookUpdate(book: Book) {
    if (book.bookType === this.newBookType) {
      this.createNewBookType()
        .subscribe((result: string) => {
          if (result) {
            book.bookType = result;
            this.updateBook(book);
          }
        });
    } else {
      this.updateBook(book);
    }
  }
  updateBook(book: Book) {
    this.bookAdministrationService.updateBooks(book).subscribe(res => {
      this.snackBar.open(
        this.translateService.instant('BOOK.EDITION.SUCCESS', {isbn: res.isbn}),
        this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
      this.bookTypeService.getAllBookType();
      this.bookAdministrationService.clearResults();
    });
  }
  createNewBookType(): Observable<string> {
    return this.dialog
      .open<NewBookTypeModalComponent, string>(NewBookTypeModalComponent, {width: '250px'})
      .afterClosed();
  }
  onBookRemoval(event: Book) {
    this.bookAdministrationService.deleteBooks(event);
  }
}
