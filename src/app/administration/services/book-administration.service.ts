import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {BookMapper} from '../models/mappers/book-mapper';
import {CoreService} from '../../core/services/core.service';
@Injectable({
  providedIn: 'root'
})
export class BookAdministrationService {
  private _searchResult: BehaviorSubject<BookSearch> = new BehaviorSubject(null);
  get searchResult(): Observable<BookSearch> {
    return this._searchResult.asObservable();
  }
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  searchBooks(isbn): Observable<BookSearch> {
    this.coreService.updateLoadingState(true);
    const params = new HttpParams().append('isbn', isbn);
    const o = this.http.get<BookSearch>('/api/search/books/findByISBN', {params}).pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => {
        console.error('an error occured!', err);
        this.coreService.updateLoadingState(false);
      },
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  clearResults() {
    this._searchResult.next(null);
  }
  addBook(bookSearch: BookSearch) {
    this.coreService.updateLoadingState(true);
    const o = this.http.post<Book>('/api/books/', BookMapper.mapBook(bookSearch)).pipe(shareReplay());
    o.subscribe(
      res => console.log('Books added', res),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
}
