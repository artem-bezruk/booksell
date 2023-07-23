import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../core/services/core.service';
import {shareReplay} from 'rxjs/operators';
import {Statistics} from '../../core/model/statistics';
@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  get searchResult(): Observable<Statistics> {
    return this._searchResult.asObservable();
  }
  private _searchResult: BehaviorSubject<Statistics> = new BehaviorSubject<Statistics>({recentlyAddedBooks: []});
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  getAllStats() {
    this.coreService.updateLoadingState(true);
    const o = this.http.get<Statistics>(`/api/stat`).pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
}
