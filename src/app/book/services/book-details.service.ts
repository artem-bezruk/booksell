import {Injectable} from '@angular/core';
import {BookDetailsEvent} from '../models/book-details-event';
import {BehaviorSubject, Observable} from 'rxjs';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {BookBySeriesContainer, SeriesByGroupContainer, SeriesInfo} from '../../core/model/series-by-group-container';
import {BookListService} from './book-list.service';
import {Book} from '../../core/model/book';
import {Utils} from '../../shared/utils';
@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  constructor(private bookListService: BookListService) {
    this.bookListService.filteredBooks.subscribe(next => this.filteredBooks = next);
    this.bookListService.filteredGroupList.subscribe(next => this.filteredGroupList = next);
  }
  get bookToDisplay(): Observable<{ book: Book | null, asNext: BookDetailsEvent | null, asPrevious: BookDetailsEvent | null } | null> {
    return this._bookToDisplay.asObservable();
  }
  private filteredGroupList: string[] = [];
  private filteredBooks: SeriesByGroupContainer = new Map();
  private _bookToDisplay:
    BehaviorSubject<{ book: Book | null, asNext: BookDetailsEvent | null, asPrevious: BookDetailsEvent | null } | null> =
    new BehaviorSubject<{ book: Book | null, asNext: BookDetailsEvent | null, asPrevious: BookDetailsEvent | null } | null>(null);
  private static updateEventSeries(event: BookDetailsEvent, series: string | null = null) {
    event.series = series ? series : event.series;
  }
  private static getSeries(seriesList: string[], seriesIndex: number | null = null, next: boolean = false) {
    let index;
    if (next) {
      index = seriesIndex !== null ? seriesIndex + 1 : 0;
    } else {
      index = seriesIndex !== null ? seriesIndex - 1 : seriesList.length - 1;
    }
    return seriesList[index];
  }
  private getSeriesSanitizedFromEvent = (event: BookDetailsEvent) => this.sanitizeSeries(this.sanitizeSeriesGroup(this.filteredBooks.get(event.group)).get(event.series));
  private sanitizeSeriesGroup = (seriesGroup: BookBySeriesContainer | undefined): BookBySeriesContainer => seriesGroup ? seriesGroup : new Map();
  private sanitizeSeries = (seriesInfo: SeriesInfo | undefined): SeriesInfo => seriesInfo ? seriesInfo : {books: [], seriesBookCount: 0};
  private compareString = (one: string, two: string) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1);
  private getBook = <T>(event: BookDetailsEvent, book: T | null): T | null => event ? book : null;
  clearBookToDisplay = () => this._bookToDisplay.next(null);
  showDetails = (bookDetailsEvent: BookDetailsEvent) => this.getBooksToDisplay(bookDetailsEvent);
  private getNextBook(event: BookDetailsEvent): BookDetailsEvent | null {
    const indexComparison: 0 | 1 | -1 = compareNumbers([event.bookIndex], [this.getBookIndex(event)]);
    const hasPrevious = indexComparison === -1;
    if (hasPrevious) {
      event.bookIndex++;
    }
    return hasPrevious || this.hasNextParentElement(event, indexComparison, 'series') ? event : null;
  }
  private hasNextSeries(event: BookDetailsEvent): boolean {
    if (event.group && event.series) {
      const list = this.getSeriesListForGroup(event.group);
      const index = list.indexOf(event.series);
      const indexComparison: 0 | 1 | -1 = compareNumbers([index], [list.length - 1]);
      if (indexComparison === -1) {
        event.bookIndex = 0;
        BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(list, index, true));
        return true;
      }
      return this.hasNextParentElement(event, indexComparison, 'group');
    }
    return false;
  }
  private hasNextParentElement(event: BookDetailsEvent, indexComparison: 0 | 1 | -1, parent: 'series' | 'group'): boolean {
    if (indexComparison === 0) {
      switch (parent) {
        case 'series':
          return this.hasNextSeries(event);
        case 'group':
          return this.hasNextGroup(event);
      }
    }
    return false;
  }
  private hasPreviousParentElement(event: BookDetailsEvent, index: number, parent: 'series' | 'group'): boolean {
    if (index === 0) {
      switch (parent) {
        case 'series':
          return this.hasPreviousSeries(event);
        case 'group':
          return this.hasPreviousGroup(event);
      }
    }
    return false;
  }
  private hasNextGroup(event: BookDetailsEvent): boolean {
    if (event.group) {
      const groupIndex = this.filteredGroupList.indexOf(event.group);
      if (compareNumbers([groupIndex], [this.filteredGroupList.length - 1]) === -1) {
        event.bookIndex = 0;
        event.group = this.filteredGroupList[groupIndex + 1];
        BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(this.getSeriesListForGroup(event.group), null, true));
        return true;
      }
    }
    return false;
  }
  private getPreviousBook(event: BookDetailsEvent): BookDetailsEvent | null {
    const hasPreviousElement = event.bookIndex > 0;
    if (hasPreviousElement) {
      event.bookIndex--;
    }
    return hasPreviousElement || this.hasPreviousParentElement(event, event.bookIndex, 'series') ? event : null;
  }
  private hasPreviousSeries(event: BookDetailsEvent): boolean {
    if (event.group && event.series) {
      const list = this.getSeriesListForGroup(event.group);
      const index = list.indexOf(event.series);
      if (index > 0) {
        BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(list, index));
        event.bookIndex = this.getBookIndex(event);
        return true;
      }
      return this.hasPreviousParentElement(event, index, 'group');
    }
    return false;
  }
  private hasPreviousGroup(event: BookDetailsEvent): boolean {
    if (event.group && event.series) {
      const groupIndex = this.filteredGroupList.indexOf(event.group);
      if (groupIndex > 0) {
        event.group = this.filteredGroupList[groupIndex - 1];
        BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(this.getSeriesListForGroup(event.group)));
        event.bookIndex = this.getBookIndex(event);
        return true;
      }
    }
    return false;
  }
  private getSeriesListForGroup(group: string): string[] {
    return Utils.getMapKeysAsArray(this.filteredBooks.get(group) || new Map<string, SeriesInfo>()).sort(this.compareString);
  }
  private getBookIndex(event: BookDetailsEvent): number {
    const series = this.getSeriesSanitizedFromEvent(event);
    return series ? series.books.length - 1 : 0;
  }
  private getBooksToDisplay(event: BookDetailsEvent) {
    const series = this.getSeriesSanitizedFromEvent(event);
    return this._bookToDisplay.next({
      book: this.getBook<Book>(event, series.books[event.bookIndex]),
      asNext: this.getBook<BookDetailsEvent>(event, this.getNextBook(Object.assign({}, event))),
      asPrevious: this.getBook<BookDetailsEvent>(event, this.getPreviousBook(Object.assign({}, event)))
    });
  }
}
