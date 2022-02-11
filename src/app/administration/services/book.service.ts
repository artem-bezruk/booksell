import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {Editor} from '../../core/model/editor';
import {AuthorSearch} from '../models/author-search';
import {Author} from '../../core/model/author';
import {BookMapper} from '../models/mappers/book-mapper';
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
  addBook(bookSearch: BookSearch) {
    this._isLoading.next(true);
    const o = this.http.post<Book>('/api/books/', BookMapper.mapBook(bookSearch)).pipe(shareReplay());
    o.subscribe(
      res => console.log('Books added', res),
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
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
