import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookBySeriesContainer, SeriesByGroupContainer, SeriesInfo} from '../../core/model/series-by-group-container';
import {SortOrder} from '../../core/model/sort-order.enum';
import {Utils} from '../../shared/utils';
import {BookService} from './book.service';
import {BookFilter} from '../../core/model/book-filter';
@Injectable({
  providedIn: 'root'
})
export class BookListService {
  order: SortOrder.DESC | SortOrder.ASC = SortOrder.ASC;
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
    this._filteredGroupList.next(Utils.orderStringList(Object.keys(this._filteredBooks.value), this.order));
  }
  isSortOrderAsc = (): boolean => this.order === SortOrder.ASC;
  changeDisplay($event: boolean) {
    this._groupByEditors.next($event);
    this._searchResult.next(this.bookService.groupBy(this._groupByEditors.value));
    this.updateFilteredBooks(this._searchResult.value);
  }
  filter(filters: BookFilter) {
    const filteredData = new Map<string, BookBySeriesContainer>();
    if (this._searchResult.value) {
      const unfilteredData: SeriesByGroupContainer = Object.assign(new Map(), this._searchResult.value);
      if (filters.group) {
        filters.group.forEach(groupName => {
          const series = unfilteredData.get(groupName);
          if (series) {
            filteredData.set(groupName, series);
          }
        });
      }
      if (filters.series) {
        unfilteredData.forEach((series: Map<string, SeriesInfo>, groupName: string) => {
          series.forEach((seriesInfo: SeriesInfo, seriesName: string) => {
            if (filters.series) {
              const seriesIsInFilter = filters.series.includes(seriesName);
              if (seriesIsInFilter && !filteredData.has(groupName)) {
                filteredData.set(groupName, new Map<string, SeriesInfo>().set(seriesName, seriesInfo));
              } else if (!seriesIsInFilter && filteredData.has(groupName)) {
                const group = filteredData.get(groupName);
                if (group) {
                  group.delete(seriesName);
                  if (group.size <= 0) {
                    filteredData.delete(groupName);
                  }
                }
              }
            }
          });
        });
      }
    }
    this.updateFilteredBooks(filteredData);
  }
  private updateFilteredBooks(seriesByEditorContainer: SeriesByGroupContainer) {
    this._filteredBooks.next(seriesByEditorContainer);
    this._filteredGroupList.next(Utils.orderStringList(Object.keys(seriesByEditorContainer), this.order));
  }
}
