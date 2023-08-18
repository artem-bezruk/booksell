import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {CoreService} from '../../core/services/core.service';
import {BookBySeriesContainer, SeriesByGroupContainer, SeriesInfo} from '../../core/model/series-by-group-container';
import {Utils} from '../../shared/utils';
import {SeriesImpl} from '../../core/model/impl/series-impl';
import {TranslateService} from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient, private coreService: CoreService, private translateService: TranslateService) {
  }
  get searchResult(): Observable<Book[]> {
    return this._searchResult.asObservable();
  }
  private currentBookType: string | null = null;
  private _searchResult: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private static createGroups(accumulator: SeriesByGroupContainer, group: string) {
    if (!accumulator.get(group)) {
      accumulator.set(group, new Map<string, SeriesInfo>());
    }
    return accumulator;
  }
  private static classSeriesByGroup(accumulator: SeriesByGroupContainer, b: Book, groupName: string) {
    const group = accumulator.get(groupName);
    if (b.series && b.series.displayName && group && !group.has(b.series.displayName)) {
      group.set(b.series.displayName, {seriesBookCount: b.series.seriesBookCount, books: []});
    }
    return accumulator;
  }
  private static addBook(accumulator: SeriesByGroupContainer, b: Book, groupByEditor: boolean = false) {
    if (b.editor.name && b.series && b.series.displayName) {
      const group = groupByEditor ? b.editor.name : b.series.displayName.charAt(0).toLocaleUpperCase();
      accumulator = BookService.createGroups(accumulator, group);
      accumulator = BookService.classSeriesByGroup(accumulator, b, group);
      const series = accumulator.get(group);
      if (series != null) {
        const seriesInfo: SeriesInfo = series.get(b.series.displayName) as SeriesInfo;
        if (seriesInfo) {
          seriesInfo.books.push(b);
        }
      }
    } else {
      if (!b.editor) {
        console.error('Error on book data [missing editor]', b);
      } else if (!b.series) {
        console.error('Error on book data [missing series]', b);
      }
    }
    return accumulator;
  }
  public groupBy(groupByEditor: boolean = false): SeriesByGroupContainer {
    const seriesByGroupContainer: SeriesByGroupContainer =
      this._searchResult.value.reduce((accumulator: SeriesByGroupContainer, book: Book) =>
        BookService.addBook(accumulator, book, groupByEditor), new Map<string, BookBySeriesContainer>());
    seriesByGroupContainer.forEach((series: Map<string, SeriesInfo>) => {
      series.forEach((seriesInfo: SeriesInfo) => seriesInfo.books.sort(Utils.compareTomes));
    });
    return seriesByGroupContainer;
  }
  getBookByType(bookType?: string) {
    this.coreService.updateLoadingState(true);
    if (bookType) {
      this.currentBookType = bookType;
    }
    const o = this.http.get<Book[]>(`/api/books/type/${this.currentBookType}`).pipe(shareReplay());
    o.pipe(map(books => books.map(book => ({...book, series: this.instenciateSeries(book)}))))
      .subscribe(
        res => this._searchResult.next(res),
        err => console.error('an error occured!', err),
        () => this.coreService.updateLoadingState(false));
    return o;
  }
  private instenciateSeries(book: Book): SeriesImpl {
    const series = SeriesImpl.fromSeries(book.series);
    if (series.isOneShot()) {
      series.displayName = this.translateService.instant('SERIES.ONE_SHOT');
    }
    return series;
  }
  bulkUpdate(books: Book[]) {
    this.coreService.updateLoadingState(true);
    const o = forkJoin(books.map(book => this.http.put<Book>('/api/books/' + book.id, book))).pipe(shareReplay());
    o.subscribe(
      () => this.getBookByType(),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  bulkDelete(books: Book[]) {
    this.coreService.updateLoadingState(true);
    const o = forkJoin(books.map(book => this.http.delete('/api/books/' + book.id))).pipe(shareReplay());
    o.subscribe(
      () => this.getBookByType(),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
}
