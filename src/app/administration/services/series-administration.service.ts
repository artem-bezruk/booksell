import {Injectable} from '@angular/core';
import {Series} from '../../core/model/series';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../core/services/core.service';
import {AdministrationService} from './administration.service';
@Injectable({
  providedIn: 'root'
})
export class SeriesAdministrationService extends AdministrationService<Series> {
  constructor(http: HttpClient, coreService: CoreService) {
    super(http, coreService, 'series');
  }
  filterFunction(series: Series, filterStr: string): boolean {
    return series.name ? series.name.toLocaleLowerCase().includes(filterStr.toLocaleLowerCase()) : false;
  }
}
