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
  groupByEditors = false;
  order: SortOrder.DESC | SortOrder.ASC;
  constructor(private bookService: BookService) {
    this.updateBookList();
    this.bookService.searchResult.subscribe(res => {
      this._searchResult.next(this.bookService.groupBy(this.groupByEditors));
      this.updateFilteredBooks(this._searchResult.value);
    });
  }
  public updateBookList() {
    this.bookService.getAllBook();
  }
  private _searchResult: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>(null);
  get searchResult(): Observable<SeriesByGroupContainer> {
    return this._searchResult.asObservable();
  }
  private _filteredBooks: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>({});
  get filteredBooks(): Observable<SeriesByGroupContainer> {
    return this._filteredBooks.asObservable();
  }
  private _filteredGroupList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get filteredGroupList(): Observable<string[]> {
    return this._filteredGroupList.asObservable();
  }
  changeSortOrder() {
    this.order = this.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this._filteredGroupList.next(Utils.orderStringList(Object.keys(this._filteredBooks.value), this.order));
  }
  isSortOrderAsc = (): boolean => this.order === SortOrder.ASC;
  changeDisplay($event: boolean) {
    this.groupByEditors = $event;
    this._searchResult.next(this.bookService.groupBy(this.groupByEditors));
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
