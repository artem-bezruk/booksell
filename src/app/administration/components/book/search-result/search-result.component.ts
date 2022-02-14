import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
  searchResult: BookSearch;
  constructor(private bookService: BookAdministrationService, private translateService: TranslateService, private snackBar: MatSnackBar) {
  }
  ngOnInit() {
     this.bookService.searchResult.subscribe(next => this.searchResult = next);
  }
  ngOnDestroy(): void {
    this.bookService.clearResults();
  }
  isBookOneShot(bookSearch: BookSearch): boolean {
    return bookSearch.series === null || bookSearch.series === '';
  }
  addBook(bookSearch: BookSearch) {
    this.bookService.addBook(bookSearch).subscribe(res => {
      this.snackBar.open(this.translateService.instant('BOOK.ADD.SUCCESS', {isbn: res.isbn}));
      this.bookService.clearResults();
    });
  }
}
