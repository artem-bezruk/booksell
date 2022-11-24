import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookBySeriesContainer, SeriesByGroupContainer} from '../../core/model/series-by-group-container';
import {SortOrder} from '../../core/model/sort-order.enum';
import {Utils} from '../../shared/utils';
import {BookService} from './book.service';
import {BookFilter} from '../../core/model/book-filter';
@Injectable({
  providedIn: 'root'
})
export class BookListService {
  order: SortOrder.DESC | SortOrder.ASC = SortOrder.DESC;
  constructor(private bookService: BookService) {
    this.bookService.searchResult.subscribe(res => {
      this._searchResult.next(this.bookService.groupBy(this._groupByEditors.value));
      this.updateFilteredBooks(this._searchResult.value);
    });
  }
  private _groupByEditors: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get groupByEditors(): Observable<boolean> {
    return this._groupByEditors.asObservable();
  }
  private _searchResult: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>(new Map());
  get searchResult(): Observable<SeriesByGroupContainer> {
    return this._searchResult.asObservable();
  }
  private _filteredBooks: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>(new Map());
  get filteredBooks(): Observable<SeriesByGroupContainer> {
    return this._filteredBooks.asObservable();
  }
  private _filteredGroupList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get filteredGroupList(): Observable<string[]> {
    return this._filteredGroupList.asObservable();
  }
  public updateBookList(bookType?: string | null) {
    if (bookType !== null) {
      this.bookService.getBookByType(bookType);
    }
  }
  changeSortOrder() {
    this.order = this.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this._filteredGroupList.next(Utils.orderStringList(Utils.getMapKeysAsArray(this._filteredBooks.value), this.order));
  }
  isSortOrderAsc = (): boolean => this.order === SortOrder.ASC;
  changeDisplay($event: boolean) {
    this._groupByEditors.next($event);
    this._searchResult.next(this.bookService.groupBy(this._groupByEditors.value));
    this.updateFilteredBooks(this._searchResult.value);
  }
  filter(filters: BookFilter) {
    const filteredData = new Map<string, BookBySeriesContainer>();
    if (filters.group.length <= 0) {
      filters.group = Utils.getMapKeysAsArray(this._searchResult.value);
    }
    if (this._searchResult.value) {
      filters.group.forEach(groupName => {
        const group = this._searchResult.value.get(groupName);
        if (group) {
          const filteredGroup = new Map();
          Utils.getMapKeysAsArray(group)
            .filter(seriesName => filters.series.length <= 0 || (group.has(seriesName) && filters.series.includes(seriesName)))
            .forEach(seriesName => filteredGroup.set(seriesName, Object.assign({}, group.get(seriesName))));
          if (Utils.getMapKeysAsArray(filteredGroup).length > 0) {
            filteredData.set(groupName, filteredGroup);
          }
        }
      });
    }
    this.updateFilteredBooks(filteredData);
  }
  private updateFilteredBooks(seriesByEditorContainer: SeriesByGroupContainer) {
    this._filteredBooks.next(seriesByEditorContainer);
    this._filteredGroupList.next(Utils.orderStringList(Utils.getMapKeysAsArray(seriesByEditorContainer), this.order));
  }
}
