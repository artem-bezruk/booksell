import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeriesByGroupContainer} from '../../../core/model/series-by-group-container';
import {BookFilter} from '../../../core/model/book-filter';
import {Utils} from '../../../shared/utils';
import {SortOrder} from '../../../core/model/sort-order.enum';
import {BookDetailsEvent} from '../../models/book-details-event';
import {Book} from '../../../core/model/book';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  constructor(private bookService: BookService) {
  }
  get group(): Observable<string[]> {
    return this._group.asObservable();
  }
  get filteredBooks(): Observable<SeriesByGroupContainer> {
    return this._filteredBooks.asObservable();
  }
  get bookDisplayEvent(): Observable<BookDetailsEvent> {
    return this._bookDisplayEvent.asObservable();
  }
  get filteredGroupList(): Observable<string[]> {
    return this._filteredGroupList.asObservable();
  }
  searchResult: SeriesByGroupContainer;
  isLoading: Observable<boolean>;
  bookToDisplay: { book: Book, asNext: BookDetailsEvent, asPrevious: BookDetailsEvent } = null;
  groupByEditors = true;
  private order: SortOrder = SortOrder.DESC;
  private _group: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _filteredBooks: BehaviorSubject<SeriesByGroupContainer> = new BehaviorSubject<SeriesByGroupContainer>({});
  private _bookDisplayEvent: BehaviorSubject<BookDetailsEvent> = new BehaviorSubject<BookDetailsEvent>(null);
  private _filteredGroupList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private static updateEventSeries(event: BookDetailsEvent, series: string = null) {
    event.series = series ? series : event.series;
  }
  private static getSeries(seriesList: string[], seriesIndex: number = null) {
    return seriesList[seriesIndex !== null ? seriesIndex - 1 : seriesList.length - 1];
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
    this.bookDisplayEvent.subscribe(event => this.getBooksToDisplay(event));
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
  changeSortOrder() {
    this.order = this.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this._filteredGroupList.next(Utils.orderStringList(Object.keys(this._filteredBooks.value), this.order));
  }
  showDetails(bookDetailsEvent: BookDetailsEvent, group: string = null) {
    if (group !== null) {
      bookDetailsEvent.group = group;
    }
    this._bookDisplayEvent.next(bookDetailsEvent);
  }
  isSortOrderAsc = (): boolean => this.order === SortOrder.ASC;
  private getNextBook(event: BookDetailsEvent) {
    const booksIndexComparaison =
      compareNumbers([event.bookIndex], [this._filteredBooks.value[event.group][event.series].books.length - 1]);
    if (booksIndexComparaison === -1) {
      event.bookIndex++;
      return event;
    } else if (booksIndexComparaison === 0) {
      const seriesList = Object.keys(this._filteredBooks.value[event.group]);
      seriesList.sort((one, two) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1));
      const seriesIndex = seriesList.indexOf(event.series);
      const seriesIndexComparaison = compareNumbers([seriesIndex], [seriesList.length - 1]);
      if (seriesIndexComparaison === -1) {
        event.bookIndex = 0;
        console.log();
        event.series = seriesList[seriesIndex + 1];
        return event;
      } else if (seriesIndexComparaison === 0) {
        const groupIndex = this._filteredGroupList.value.indexOf(event.group);
        if (compareNumbers([groupIndex], [this._filteredGroupList.value.length - 1]) === -1) {
          event.group = this._filteredGroupList.value[groupIndex + 1];
          const newSeriesList = Object.keys(this._filteredBooks.value[event.group]);
          newSeriesList.sort((one, two) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1));
          event.series = newSeriesList[0];
          event.bookIndex = 0;
          return event;
        } else if (compareNumbers([seriesIndex], [this._filteredGroupList.value.length - 1]) === 0) {
          return null;
        }
      }
    }
    return null;
  }
  private getPreviousBook(event: BookDetailsEvent) {
    let hasPrevious = true;
    if (event.bookIndex > 0) {
      event.bookIndex--;
    } else {
      hasPrevious = event.bookIndex === 0 ? this.getPreviousSeries(event) : false;
    }
    return hasPrevious ? event : null;
  }
  private getPreviousSeries(event: BookDetailsEvent): boolean {
    const seriesList = this.getSeriesListForGroup(event.group);
    const seriesIndex = seriesList.indexOf(event.series);
    if (seriesIndex > 0) {
      BookListComponent.updateEventSeries(event, BookListComponent.getSeries(seriesList, seriesIndex));
      event.bookIndex = this.getBookIndex(event);
      return true;
    } else {
      return seriesIndex === 0 ? this.getPreviousGroup(event) : false;
    }
  }
  private getPreviousGroup(event): boolean {
    const groupIndex = this._filteredGroupList.value.indexOf(event.group);
    if (groupIndex > 0) {
      event.group = this._filteredGroupList.value[groupIndex - 1];
      BookListComponent.updateEventSeries(event, BookListComponent.getSeries(this.getSeriesListForGroup(event.group)));
      event.bookIndex = this.getBookIndex(event);
      return true;
    } else {
      return false;
    }
  }
  private getSeriesListForGroup(group: string): string[] {
    return Object.keys(this._filteredBooks.value[group])
      .sort((one, two) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1));
  }
  private getBookIndex(event: BookDetailsEvent): number {
    return this._filteredBooks.value[event.group][event.series].books.length - 1;
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
  private getBooksToDisplay(event) {
    console.log(event);
    const book = event ? this._filteredBooks.value[event.group][event.series].books[event.bookIndex] : null;
    const asNext = event ? this.getNextBook(Object.assign({}, event)) : null;
    const asPrevious = event ? this.getPreviousBook(Object.assign({}, event)) : null;
    this.bookToDisplay = {book, asNext, asPrevious};
    console.log(this.bookToDisplay);
  }
  private updateFilteredBooks(seriesByEditorContainer: SeriesByGroupContainer) {
    if (seriesByEditorContainer !== null) {
      this._filteredBooks.next(seriesByEditorContainer);
      this._filteredGroupList.next(Utils.orderStringList(Object.keys(seriesByEditorContainer), this.order));
    }
  }
}
