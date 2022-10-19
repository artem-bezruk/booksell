import {Injectable} from '@angular/core';
import {Series} from '../../core/model/series';
import {shareReplay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CoreService} from '../../core/services/core.service';
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
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  updateSeries(series: Series) {
    this.coreService.updateLoadingState(true);
    const o = this.http.put<Series>('/api/series/', series).pipe(shareReplay());
    o.subscribe(
      res => this.getAllSeries(),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  getAllSeries() {
    this.coreService.updateLoadingState(true);
    const o = this.http.get<Series[]>('/api/series/').pipe(shareReplay());
    o.subscribe(
      res => {
        this._seriesList.next(res.sort((one, two) => (one.name.toLocaleLowerCase() < two.name.toLocaleLowerCase() ? -1 : 1)));
        this.filter(this.filterStr);
      },
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  filter(filterStr: string) {
    this.filterStr = filterStr;
    if (filterStr && filterStr !== '') {
      this._seriesListFiltered.next(this._seriesList.value
        .filter(series => series.name.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase())));
    } else {
      this._seriesListFiltered.next(this._seriesList.value);
    }
  }
}
