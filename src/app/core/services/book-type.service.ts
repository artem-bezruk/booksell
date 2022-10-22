import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';
import {CoreService} from './core.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookType} from '../model/bookType';
@Injectable({
  providedIn: 'root'
})
export class BookTypeService {
  private _bookTypes: BehaviorSubject<BookType[]> = new BehaviorSubject([]);
  get bookTypes(): Observable<BookType[]> {
    return this._bookTypes.asObservable();
  }
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  getAllBookType(): Observable<BookType[]> {
    this.coreService.updateLoadingState(true);
    const o = this.http.get<BookType[]>('/api/bookTypes/').pipe(shareReplay());
    o.subscribe(
      res => this._bookTypes.next(res),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
}
