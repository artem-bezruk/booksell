import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../core/services/core.service';
import {shareReplay} from 'rxjs/operators';
import {StatDTO} from '../../core/model/statDTO';
@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  get searchResult(): Observable<StatDTO> {
    return this._searchResult.asObservable();
  }
  private _searchResult: BehaviorSubject<StatDTO> = new BehaviorSubject<StatDTO>({recentlyAdded: []});
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  getAllStats() {
    this.coreService.updateLoadingState(true);
    const o = this.http.get<StatDTO>(`/api/stat`).pipe(shareReplay());
    o.subscribe(
      res => this._searchResult.next(res),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
}
