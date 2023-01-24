import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../core/services/core.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {RestEntity} from '../../core/model/rest-entity';
@Injectable({
  providedIn: 'root'
})
export abstract class AdministrationService<T extends RestEntity> {
  protected apiEndpoints = 't';
  private filterStr = '';
  private _list: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  get list(): Observable<T[]> {
    return this._list.asObservable();
  }
  private _listFiltered: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  get listFiltered(): Observable<T[]> {
    return this._listFiltered.asObservable();
  }
  protected constructor(protected http: HttpClient, protected coreService: CoreService) {
  }
  getAll(): Observable<T[]> {
    this.coreService.updateLoadingState(true);
    const o = this.http.get<T[]>(`/api/${this.apiEndpoints}`).pipe(shareReplay());
    o.subscribe(
      res => {
        this._list.next(res);
        this.filter(this.filterStr);
      },
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  update(t: T) {
    this.coreService.updateLoadingState(true);
    const o = this.http.put<T>(`/api/${this.apiEndpoints}/${t.id}`, t).pipe(shareReplay());
    o.subscribe(
      () => {
      },
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  delete(t: T) {
    this.coreService.updateLoadingState(true);
    const o = this.http.delete<T>(`/api/${this.apiEndpoints}/${t.id}`).pipe(shareReplay());
    o.subscribe(
      () => this.getAll(),
      err => console.error('an error occured!', err),
      () => this.coreService.updateLoadingState(false));
    return o;
  }
  abstract filterFunction(t: T, filterStr: string): boolean;
  filter(filterStr: string): void {
    this.filterStr = filterStr;
    this._listFiltered.next(filterStr && filterStr !== '' ?
      this._list.value.filter((t: T) => this.filterFunction(t, filterStr)) :
      this._list.value);
  }
}
