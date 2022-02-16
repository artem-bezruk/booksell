import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _searchResult: BehaviorSubject<Book[]> = new BehaviorSubject(null);
  get searchResult(): Observable<Book[]> {
    return this._searchResult.asObservable();
  }
  private _isLoading = new BehaviorSubject<boolean>(false);
  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  constructor(private http: HttpClient) {
  }
  getAllBook() {
    this._isLoading.next(true);
    const o = this.http.get<Book[]>('/api/books/').pipe(shareReplay());
    o.subscribe(
      res => console.log('Books added', res),
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
  }
}
