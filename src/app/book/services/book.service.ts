import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {shareReplay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _searchResult: BehaviorSubject<BookSearch> = new BehaviorSubject(null);
  get searchResult(): Observable<BookSearch> {
    return this._searchResult.asObservable();
  }
  private _isLoading = new BehaviorSubject<boolean>(false);
  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  constructor(private http: HttpClient) {
  }
  searchBooks(isbn): Observable<BookSearch> {
    this._isLoading.next(true);
    const params = new HttpParams().append('isbn', isbn);
    const o = this.http.get<BookSearch>('/api/search/books/findByISBN', {params}).pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
  }
  clearResults() {
    this._searchResult.next(null);
  }
}
