import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BookSearch} from '../../models/book-search';
import {BookService} from '../../services/book.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchResult: Observable<BookSearch>;
  constructor(private bookService: BookService) { }
  ngOnInit() {
    this.searchResult = this.bookService.searchResult;
  }
  ngOnDestroy(): void {
    this.bookService.clearResults();
  }
  isBookOneShot(bookSearch: BookSearch): boolean {
    return bookSearch.series === null || bookSearch.series === '';
  }
}
