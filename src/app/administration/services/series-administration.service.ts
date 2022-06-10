import {Injectable} from '@angular/core';
import {Series} from '../../core/model/series';
import {shareReplay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeriesAdministrationService {
  private _seriesList: BehaviorSubject<Series[]> = new BehaviorSubject(null);
  private filterStr: string = null;
  get seriesList(): Observable<Series[]> {
    return this._seriesList.asObservable();
  }
  private _seriesListFiltered: BehaviorSubject<Series[]> = new BehaviorSubject(null);
  get seriesListFiltered(): Observable<Series[]> {
    return this._seriesListFiltered.asObservable();
  }
  private _isLoading = new BehaviorSubject<boolean>(false);
  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  constructor(private http: HttpClient) {
  }
  updateSeries(series: Series) {
    this._isLoading.next(true);
    const o = this.http.put<Series>('/api/series/', series).pipe(shareReplay());
    o.subscribe(
      res => this.getAllSeries(),
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
  }
  getAllSeries() {
    this._isLoading.next(true);
    const o = this.http.get<Series[]>('/api/series/').pipe(shareReplay());
    o.subscribe(
      res => {
        this._seriesList.next(res);
        this.filter(this.filterStr);
      },
      err => console.error('an error occured!', err),
      () => this._isLoading.next(false));
    return o;
  }
  filter(filterStr: string) {
    this.filterStr = filterStr;
    if (filterStr && filterStr !== '') {
      this._seriesListFiltered.next(this._seriesList.value.filter(series => series.name.includes(filterStr)));
    } else {
      this._seriesListFiltered.next(this._seriesList.value);
    }
  }
}
