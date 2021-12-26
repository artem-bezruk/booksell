import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookSearch} from '../models/book-search';
import {AuthService} from '../../auth/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  searchBooks(isbn): Observable<BookSearch> {
    const params = new HttpParams().append('isbn', isbn);
    return this.http.get<BookSearch>('/api/search/books/findByISBN', {params});
  }
}
