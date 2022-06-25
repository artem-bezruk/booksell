import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeriesByGroupContainer} from '../../../core/model/series-by-group-container';
import {BookFilter} from '../../../core/model/book-filter';
import {Utils} from '../../../shared/utils';
import {SortOrder} from '../../../core/model/sort-order.enum';
import {Book} from '../../../core/model/book';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  searchResult: SeriesByGroupContainer;
  isLoading: Observable<boolean>;
  bookToDisplay: Book = null;
  groupByEditors = true;
  private order: SortOrder = SortOrder.DESC;
  constructor(private bookService: BookService) {
  }
  private _group: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get group(): Observable<string[]> {
    return this._group.asObservable();
  }
  private _filteredBooks: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>({});
  get filteredBooks(): Observable<SeriesByGroupContainer> {
    return this._filteredBooks.asObservable();
  }
  private _filteredBookList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get filteredBookList(): Observable<string[]> {
    return this._filteredBookList.asObservable();
  }
  ngOnInit() {
    this.bookService.getAllBook();
    this.bookService.searchResult.subscribe(res => {
      this.searchResult = this.bookService.groupBy(this.groupByEditors);
      this.updateFilteredBooks(this.searchResult);
      if (this.searchResult !== null) {
        this._group.next(Utils.orderStringList(Object.keys(this.searchResult), this.order));
      }
    });
    this.isLoading = this.bookService.isLoading;
  }
  onFilter(filters: BookFilter) {
    const tmpGroup = Object.assign({}, this.searchResult);
    if (filters.group.length > 0) {
      Object.keys(this.searchResult)
        .filter(group => !filters.group.includes(group))
        .forEach(group => delete tmpGroup[group]);
    }
    if (filters.series.length > 0) {
      Object.keys(tmpGroup).forEach(group => {
        const tmpSeries = Object.assign({}, tmpGroup[group]);
        Object.keys(tmpSeries)
          .filter(series => !filters.series.includes(series))
          .forEach(series => delete tmpSeries[series]);
        if (Object.keys(tmpSeries).length === 0) {
          delete tmpGroup[group];
        } else {
          tmpGroup[group] = tmpSeries;
        }
      });
    }
    this.updateFilteredBooks(tmpGroup);
  }
  private updateFilteredBooks(seriesByEditorContainer: SeriesByGroupContainer) {
    if (seriesByEditorContainer !== null) {
      this._filteredBooks.next(seriesByEditorContainer);
      this._filteredBookList.next(Utils.orderStringList(Object.keys(seriesByEditorContainer), this.order));
    }
  }
  changeSortOrder() {
    this.order = this.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this._filteredBookList.next(Utils.orderStringList(Object.keys(this._filteredBooks.value), this.order));
  }
  isSortOrderAsc = (): boolean => this.order === SortOrder.ASC;
  showDetails(book: Book) {
    this.bookToDisplay = book;
  }
  clearBookToDisplay() {
    this.bookToDisplay = null;
  }
  changeDisplay($event: boolean) {
    this.groupByEditors = $event;
    this.searchResult = this.bookService.groupBy(this.groupByEditors);
    this.updateFilteredBooks(this.searchResult);
    if (this.searchResult !== null) {
      this._group.next(Utils.orderStringList(Object.keys(this.searchResult), this.order));
    }
  }
}
