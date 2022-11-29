import {Component, OnInit} from '@angular/core';
import {SeriesAdministrationService} from '../../../services/series-administration.service';
import {Observable} from 'rxjs';
import {Series} from '../../../../core/model/series';
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html'
})
export class SeriesListComponent implements OnInit {
  seriesList: Observable<Series[]> = this.seriesService.seriesListFiltered;
  constructor(private seriesService: SeriesAdministrationService) {
  }
  ngOnInit() {
  }
  onSeriesUpdate($event: Series) {
    this.seriesService.updateSeries($event);
  }
}
