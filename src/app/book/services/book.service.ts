import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {shareReplay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {
  }
  private _searchResult: BehaviorSubject<BookSearch> = new BehaviorSubject(null);
  get searchResult(): Observable<BookSearch> {
    return this._searchResult.asObservable();
  }
  searchBooks(isbn): Observable<BookSearch> {
    const params = new HttpParams().append('isbn', isbn);
    const o = this.http.get<BookSearch>('/api/search/books/findByISBN', {params}).pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => console.error('an error occured!', err));
    return o;
  }
}
