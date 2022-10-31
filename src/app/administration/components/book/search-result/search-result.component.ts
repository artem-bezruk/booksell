import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookSearch} from '../../../models/book-search';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchResult: BookSearch = {
    editor: 'N/A',
    title: 'N/A'
  };
  constructor(private bookService: BookAdministrationService, private translateService: TranslateService, private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.bookService.searchResult.subscribe(next => {
      if (next !== null) {
        this.searchResult = next;
      }
    });
  }
  ngOnDestroy(): void {
    this.bookService.clearResults();
  }
  isBookOneShot(bookSearch: BookSearch): boolean {
    return bookSearch.series === null || bookSearch.series === '';
  }
  addBook(bookSearch: BookSearch) {
    this.bookService.addBook(bookSearch, 'Sans type').subscribe(res => {
      this.snackBar.open(
        this.translateService.instant('BOOK.ADD.SUCCESS', {isbn: res.isbn}),
        this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
      this.bookService.clearResults();
    });
  }
}
