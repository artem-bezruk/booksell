import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookSearch} from '../../../../models/book-search';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {BookType} from '../../../../../core/model/bookType';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {NewBookTypeModalComponent} from '../../shared/new-book-type-modal/new-book-type-modal.component';
import {DisplayImage} from '../../../../../shared/display-image';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent extends DisplayImage implements OnInit, OnDestroy {
  searchResult: BookSearch = {
    editor: 'N/A',
    title: 'N/A'
  };
  bookTypes: Observable<BookType[]> = this.bookTypeService.bookTypes;
  selected = '0';
  constructor(private bookAdministrationService: BookAdministrationService,
              private translateService: TranslateService,
              private bookTypeService: BookTypeService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    super('/files/search/covers')
  }
  ngOnInit() {
    this.bookAdministrationService.searchResult.subscribe(next => {
      if (next !== null) {
        this.searchResult = next;
      }
    });
  }
  ngOnDestroy(): void {
    this.bookAdministrationService.clearResults();
  }
  isBookOneShot(bookSearch: BookSearch): boolean {
    return bookSearch.series === null || bookSearch.series === '';
  }
  addBook(bookSearch: BookSearch, bookType: string) {
    if (bookType === '0') {
      this.createNewBookType()
        .subscribe((result: string) => {
          if (result) {
            this.createBook(bookSearch, result);
          }
        });
    } else {
      this.createBook(bookSearch, bookType);
    }
  }
  createBook(bookSearch: BookSearch, bookType: string) {
    this.bookAdministrationService.add(bookSearch, bookType).subscribe(res => {
      this.snackBar.open(
        this.translateService.instant('BOOK.ADD.SUCCESS', {isbn: res.isbn}),
        this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
      this.bookAdministrationService.clearResults();
    });
  }
  createNewBookType(): Observable<string> {
    return this.dialog
      .open<NewBookTypeModalComponent, string>(NewBookTypeModalComponent, {width: '400px'})
      .afterClosed();
  }
}
