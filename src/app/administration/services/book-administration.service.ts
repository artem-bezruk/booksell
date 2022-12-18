import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {shareReplay} from 'rxjs/operators';
import {Book} from '../../core/model/book';
import {BookMapper} from '../models/mappers/book-mapper';
import {CoreService} from '../../core/services/core.service';
import {BookTypeService} from '../../core/services/book-type.service';
@Injectable({
  providedIn: 'root'
})
export class BookAdministrationService {
  private filterStr = '';
  constructor(private http: HttpClient, private coreService: CoreService, private bookTypeService: BookTypeService) {
  }
  private _searchResult: BehaviorSubject<BookSearch | null> = new BehaviorSubject<BookSearch | null>(null);
  get searchResult(): Observable<BookSearch | null> {
    return this._searchResult.asObservable();
  }
  private _bookList: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  get bookList(): Observable<Book[]> {
    return this._bookList.asObservable();
  }
  private _bookListFiltered: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  get bookListFiltered(): Observable<Book[]> {
    return this._bookListFiltered.asObservable();
  }
  searchBooks(isbn: string): Observable<BookSearch> {
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
  addBook(bookSearch: BookSearch, bookType: string) {
    this.coreService.updateLoadingState(true);
    const o = this.http.post<Book>('/api/books/', BookMapper.mapBook(bookSearch, bookType)).pipe(shareReplay());
    o.subscribe(
      res => console.log('Books added', res),
      err => console.error('an error occured!', err),
      () => {
        this.bookTypeService.getAllBookType();
        this.coreService.updateLoadingState(false);
      });
    return o;
  }
  getAllBooks() {
    this.coreService.updateLoadingState(true);
    const o = this.http.get<Book[]>(`/api/books`).pipe(shareReplay());
    o.subscribe(
      res => {
        this._bookList.next(res);
        this.filter(this.filterStr);
      },
      err => console.error('an error occured!', err)
      ,
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  updateBooks(book: Book) {
    this.coreService.updateLoadingState(true);
    const o = this.http.put<Book>(`/api/books/${book.id}`, book).pipe(shareReplay());
    o.subscribe(
      () => this.getAllBooks(),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  deleteBooks(book: Book) {
    this.coreService.updateLoadingState(true);
    const o = this.http.delete<Book>(`/api/books/${book.id}`,).pipe(shareReplay());
    o.subscribe(
      () => this.getAllBooks(),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  filter(filterStr: string) {
    this.filterStr = filterStr;
    if (filterStr && filterStr !== '') {
      this._bookListFiltered.next(this._bookList.value
        .filter((book: Book) => {
            if (book.title) {
              return book.title.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase());
            }
            return false;
          }
        ));
    } else {
      this._bookListFiltered.next(this._bookList.value);
    }
  }
}
