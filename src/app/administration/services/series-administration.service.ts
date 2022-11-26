import {Injectable} from '@angular/core';
import {Series} from '../../core/model/series';
import {shareReplay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CoreService} from '../../core/services/core.service';
import {Utils} from '../../shared/utils';
@Injectable({
  providedIn: 'root'
})
export class SeriesAdministrationService {
  private filterStr: string | null = null;
  constructor(private http: HttpClient, private coreService: CoreService) {
  }
  private _seriesList: BehaviorSubject<Series[]> = new BehaviorSubject<Series[]>([]);
  get seriesList(): Observable<Series[]> {
    return this._seriesList.asObservable();
  }
  private _seriesListFiltered: BehaviorSubject<Series[]> = new BehaviorSubject<Series[]>([]);
  get seriesListFiltered(): Observable<Series[]> {
    return this._seriesListFiltered.asObservable();
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
        res.sort(Utils.compareNames);
        this._seriesList.next(res);
        if (this.filterStr !== null) {
          this.filter(this.filterStr);
        }
      },
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  filter(filterStr: string) {
    this.filterStr = filterStr;
    if (filterStr && filterStr !== '') {
      this._seriesListFiltered.next(this._seriesList.value
        .filter((series: Series) => {
            if (series.name) {
              return series.name.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase());
            }
            return false;
          }
        ));
    } else {
      this._seriesListFiltered.next(this._seriesList.value);
    }
  }
}
