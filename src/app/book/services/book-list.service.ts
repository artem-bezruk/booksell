import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeriesByGroupContainer} from '../../core/model/series-by-group-container';
import {SortOrder} from '../../core/model/sort-order.enum';
import {Utils} from '../../shared/utils';
import {BookService} from './book.service';
import {BookFilter} from '../../core/model/book-filter';
@Injectable({
  providedIn: 'root'
})
export class BookListService {
  constructor(private bookService: BookService) {
    this.updateBookList();
    this.bookService.searchResult.subscribe(res => {
      this._searchResult.next(this.bookService.groupBy(this._groupByEditors.value));
      this.updateFilteredBooks(this._searchResult.value);
    });
  }
  get searchResult(): Observable<SeriesByGroupContainer> {
    return this._searchResult.asObservable();
  }
  get filteredBooks(): Observable<SeriesByGroupContainer> {
    return this._filteredBooks.asObservable();
  }
  get filteredGroupList(): Observable<string[]> {
    return this._filteredGroupList.asObservable();
  }
  get groupByEditors(): Observable<boolean> {
    return this._groupByEditors.asObservable();
  }
  order: SortOrder.DESC | SortOrder.ASC;
  private _groupByEditors: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _searchResult: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>(null);
  private _filteredBooks: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>({});
  private _filteredGroupList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public updateBookList() {
    this.bookService.getAllBook();
  }
  changeSortOrder() {
    this.order = this.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this._filteredGroupList.next(Utils.orderStringList(Object.keys(this._filteredBooks.value), this.order));
  }
  isSortOrderAsc = (): boolean => this.order === SortOrder.ASC;
  changeDisplay($event: boolean) {
    this._groupByEditors.next($event);
    this._searchResult.next(this.bookService.groupBy(this._groupByEditors.value));
    this.updateFilteredBooks(this._searchResult.value);
  }
  filter(filters: BookFilter) {
    const tmpGroup = Object.assign({}, this._searchResult.value);
    if (filters.group.length > 0) {
      this.removeKey(tmpGroup, filters.group);
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
      this._filteredGroupList.next(Utils.orderStringList(Object.keys(seriesByEditorContainer), this.order));
    }
  }
  private removeKey(object: any, filters: string[]) {
    Object.keys(object)
      .filter(key => !filters.includes(key))
      .forEach(key => delete object[key]);
  }
}
