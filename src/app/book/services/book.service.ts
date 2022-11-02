import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {SeriesByGroupContainer, SeriesInfo} from '../../core/model/series-by-group-container';
import {CoreService} from '../../core/services/core.service';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  private _searchResult: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  get searchResult(): Observable<Book[]> {
    return this._searchResult.asObservable();
  }
  private currentBookType: string | null = null;
  private static createGroups(accumulator: SeriesByGroupContainer, group: string) {
    if (!accumulator[group]) {
      accumulator[group] = [];
    }
    return accumulator;
  }
  private static classSeriesByGroup(accumulator: SeriesByGroupContainer, b: Book, group: string) {
    if (b.series && b.series.name && !accumulator[group][b.series.name]) {
      (accumulator[group][b.series.name] as SeriesInfo) = {
        seriesBookCount: b.series.seriesBookCount,
        books: []
      };
    }
    return accumulator;
  }
  private static addBook(accumulator: SeriesByGroupContainer, b: Book, groupByEditor: boolean = false) {
    if (b.editor.name && b.series && b.series.name) {
      const group = groupByEditor ? b.editor.name : b.series.name.charAt(0).toLocaleUpperCase();
      accumulator = BookService.createGroups(accumulator, group);
      accumulator = BookService.classSeriesByGroup(accumulator, b, group);
      const seriesInfo: SeriesInfo = accumulator[group][b.series.name] as SeriesInfo;
      seriesInfo.books.push(b);
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
        BookService.addBook(accumulator, book, groupByEditor), {});
    Object.keys(seriesByGroupContainer).forEach(group => {
      Object.keys(seriesByGroupContainer[group]).forEach((series: string) =>
        seriesByGroupContainer[group][series].books =
          seriesByGroupContainer[group][series].books.sort((one: Book, two: Book) => {
            if (one.tome && two.tome) {
              return (one.tome < two.tome ? -1 : 1);
            }
            return 0;
          })
      );
    });
    return seriesByGroupContainer;
  }
  getBookByType(bookType?: string) {
    this.coreService.updateLoadingState(true);
    if (bookType) {
      this.currentBookType = bookType;
    }
    const o = this.http.get<Book[]>(`/api/books/type/${this.currentBookType}`).pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
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
