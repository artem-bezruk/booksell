import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {BookMapper} from '../models/mappers/book-mapper';
import {CoreService} from '../../core/services/core.service';
import {BookTypeService} from '../../core/services/book-type.service';
import {AdministrationService} from './administration.service';
@Injectable({
  providedIn: 'root'
})
export class BookAdministrationService extends AdministrationService<Book> {
  constructor(http: HttpClient, coreService: CoreService, private bookTypeService: BookTypeService) {
    super(http, coreService, 'books');
  }
  private _searchResult: BehaviorSubject<BookSearch | null> = new BehaviorSubject<BookSearch | null>(null);
  get searchResult(): Observable<BookSearch | null> {
    return this._searchResult.asObservable();
  }
  search(isbn: string): Observable<BookSearch> {
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
  add(bookSearch: BookSearch, bookType: string): Observable<Book> {
    this.coreService.updateLoadingState(true);
    const o = this.http.post<Book>('/api/books/', BookMapper.mapBook(bookSearch, bookType)).pipe(shareReplay());
    o.subscribe(
      () => {},
      err => console.error('an error occured!', err),
      () => {
        this.bookTypeService.getAllBookType();
        this.coreService.updateLoadingState(false);
      });
    return o;
  }
  filterFunction(book: Book, filterStr: string): boolean {
    return book.title ? book.title.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase()) : false;
  }
}
