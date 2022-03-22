import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {SeriesByEditorContainer} from '../../core/model/series-by-editor-container';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  get searchResult(): Observable<SeriesByEditorContainer> {
    return this._searchResult.asObservable();
  }
  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  constructor(private http: HttpClient) {
  }
  private _searchResult: BehaviorSubject<SeriesByEditorContainer> = new BehaviorSubject(null);
  private _isLoading = new BehaviorSubject<boolean>(false);
  private static testEditor(accumulator: SeriesByEditorContainer, b: Book) {
    if (!accumulator[b.editor.name]) {
      accumulator[b.editor.name] = [];
    }
    return accumulator;
  }
  private static testSeries(accumulator: SeriesByEditorContainer, b: Book) {
    if (!accumulator[b.editor.name][b.series.name]) {
      accumulator[b.editor.name][b.series.name] = {
        seriesBookCount: b.series.seriesBookCount,
        books: []
      };
    }
    return accumulator;
  }
  private static addBook(accumulator: SeriesByEditorContainer, b: Book) {
    accumulator = BookService.testEditor(accumulator, b);
    accumulator = BookService.testSeries(accumulator, b);
    accumulator[b.editor.name][b.series.name].books.push(b);
    return accumulator;
  }
  getAllBook() {
    this._isLoading.next(true);
    const o = this.http.get<Book[]>('/api/books/').pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res.reduce((accumulator, book) => BookService.addBook(accumulator, book), {})),
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
  }
}
