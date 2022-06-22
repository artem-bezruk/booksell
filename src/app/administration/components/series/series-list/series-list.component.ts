import {Component, OnInit} from '@angular/core';
import {SeriesAdministrationService} from '../../../services/series-administration.service';
import {Observable} from 'rxjs';
import {Series} from '../../../../core/model/series';
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  seriesList: Observable<Series[]>;
  constructor(private seriesService: SeriesAdministrationService) {
  }
  ngOnInit() {
    this.seriesList = this.seriesService.seriesListFiltered;
  }
  onSeriesUpdate($event: Series) {
    this.seriesService.updateSeries($event);
  }
}
