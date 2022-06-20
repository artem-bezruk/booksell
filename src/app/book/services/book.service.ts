import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {SeriesByGroupContainer} from '../../core/model/series-by-group-container';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  get searchResult(): Observable<Book[]> {
    return this._searchResult.asObservable();
  }
  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  constructor(private http: HttpClient) {
  }
  private _searchResult: BehaviorSubject<Book[]> = new BehaviorSubject([]);
  private _isLoading = new BehaviorSubject<boolean>(false);
  private static createGroups(accumulator: SeriesByGroupContainer, group: string) {
    if (!accumulator[group]) {
      accumulator[group] = [];
    }
    return accumulator;
  }
  private static classSeriesByGroup(accumulator: SeriesByGroupContainer, b: Book, group: string) {
    if (!accumulator[group][b.series.name]) {
      accumulator[group][b.series.name] = {
        seriesBookCount: b.series.seriesBookCount,
        books: []
      };
    }
    return accumulator;
  }
  private static addBook(accumulator: SeriesByGroupContainer, b: Book, groupByEditor: boolean = false) {
    const group = groupByEditor ? b.editor.name : b.series.name.charAt(0).toLocaleUpperCase();
    accumulator = BookService.createGroups(accumulator, group);
    accumulator = BookService.classSeriesByGroup(accumulator, b, group);
    accumulator[group][b.series.name].books.push(b);
    return accumulator;
  }
  public groupBy(groupByEditor: boolean = false): SeriesByGroupContainer {
    const seriesByGroupContainer: SeriesByGroupContainer =
      this._searchResult.value.reduce((accumulator, book) => BookService.addBook(accumulator, book, groupByEditor), {});
    Object.keys(seriesByGroupContainer).forEach(group => {
      Object.keys(seriesByGroupContainer[group]).forEach(series =>
        seriesByGroupContainer[group][series].books =
          seriesByGroupContainer[group][series].books.sort((one, two) => (one.tome < two.tome ? -1 : 1))
      );
    });
    return seriesByGroupContainer;
  }
  getAllBook() {
    this._isLoading.next(true);
    const o = this.http.get<Book[]>('/api/books/').pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
  }
}
