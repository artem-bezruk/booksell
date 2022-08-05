import {Injectable} from '@angular/core';
import {BookDetailsEvent} from '../models/book-details-event';
import {BehaviorSubject, Observable} from 'rxjs';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {SeriesByGroupContainer} from '../../core/model/series-by-group-container';
import {BookListService} from './book-list.service';
import {Book} from '../../core/model/book';
@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  private filteredGroupList: string[] = [];
  private filteredBooks: SeriesByGroupContainer = null;
  constructor(private bookListService: BookListService) {
    this.bookListService.filteredBooks.subscribe(next => this.filteredBooks = next);
    this.bookListService.filteredGroupList.subscribe(next => this.filteredGroupList = next);
  }
  private _bookToDisplay: BehaviorSubject<{ book: Book, asNext: BookDetailsEvent, asPrevious: BookDetailsEvent }> =
    new BehaviorSubject<{ book: Book, asNext: BookDetailsEvent, asPrevious: BookDetailsEvent }>(null);
  get bookToDisplay(): Observable<{ book: Book, asNext: BookDetailsEvent, asPrevious: BookDetailsEvent }> {
    return this._bookToDisplay.asObservable();
  }
  private static updateEventSeries(event: BookDetailsEvent, series: string = null) {
    event.series = series ? series : event.series;
  }
  private static getSeries(seriesList: string[], seriesIndex: number = null, next: boolean = false) {
    let index = null;
    if (next) {
      index = seriesIndex !== null ? seriesIndex + 1 : 0;
    } else {
      index = seriesIndex !== null ? seriesIndex - 1 : seriesList.length - 1;
    }
    return seriesList[index];
  }
  clearBookToDisplay() {
    this._bookToDisplay.next(null);
    console.log('clearBookToDisplay');
  }
  showDetails(bookDetailsEvent: BookDetailsEvent) {
    this.getBooksToDisplay(bookDetailsEvent);
  }
  private getNextBook(event: BookDetailsEvent) {
    let hasPrevious = true;
    const booksIndexComparison = compareNumbers([event.bookIndex], [this.getBookIndex(event)]);
    if (booksIndexComparison === -1) {
      event.bookIndex++;
    } else {
      hasPrevious = (booksIndexComparison === 0 ? this.getNextSeries(event) : false);
    }
    return hasPrevious ? event : null;
  }
  private getNextSeries(event: BookDetailsEvent): boolean {
    const seriesList = this.getSeriesListForGroup(event.group);
    const seriesIndex = seriesList.indexOf(event.series);
    const seriesIndexComparison = compareNumbers([seriesIndex], [seriesList.length - 1]);
    if (seriesIndexComparison === -1) {
      event.bookIndex = 0;
      BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(seriesList, seriesIndex, true));
      return true;
    }
    return seriesIndexComparison === 0 ? this.getNextGroup(event) : false;
  }
  private getNextGroup(event): boolean {
    const groupIndex = this.filteredGroupList.indexOf(event.group);
    if (compareNumbers([groupIndex], [this.filteredGroupList.length - 1]) === -1) {
      event.bookIndex = 0;
      event.group = this.filteredGroupList[groupIndex + 1];
      BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(this.getSeriesListForGroup(event.group), null, true));
      return true;
    }
    return false;
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
      BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(seriesList, seriesIndex));
      event.bookIndex = this.getBookIndex(event);
      return true;
    }
    return seriesIndex === 0 ? this.getPreviousGroup(event) : false;
  }
  private getPreviousGroup(event): boolean {
    const groupIndex = this.filteredGroupList.indexOf(event.group);
    if (groupIndex > 0) {
      event.group = this.filteredGroupList[groupIndex - 1];
      BookDetailsService.updateEventSeries(event, BookDetailsService.getSeries(this.getSeriesListForGroup(event.group)));
      event.bookIndex = this.getBookIndex(event);
      return true;
    }
    return false;
  }
  private getSeriesListForGroup(group: string): string[] {
    return Object.keys(this.filteredBooks[group])
      .sort((one, two) => (one.toLocaleLowerCase() < two.toLocaleLowerCase() ? -1 : 1));
  }
  private getBookIndex(event: BookDetailsEvent): number {
    return this.filteredBooks[event.group][event.series].books.length - 1;
  }
  private getBooksToDisplay(event) {
    const book = event ? this.filteredBooks[event.group][event.series].books[event.bookIndex] : null;
    const asNext = event ? this.getNextBook(Object.assign({}, event)) : null;
    const asPrevious = event ? this.getPreviousBook(Object.assign({}, event)) : null;
    this._bookToDisplay.next({book, asNext, asPrevious});
  }
}