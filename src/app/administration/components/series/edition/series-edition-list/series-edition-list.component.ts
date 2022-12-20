import {Component, OnInit} from '@angular/core';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {Observable} from 'rxjs';
import {Series} from '../../../../../core/model/series';
@Component({
  selector: 'app-series-edition-list',
  templateUrl: './series-edition-list.component.html',
  styleUrls: ['../../../../administration-edition.scss']
})
export class SeriesEditionListComponent implements OnInit {
  seriesList: Observable<Series[]> = this.seriesService.seriesListFiltered;
  constructor(private seriesService: SeriesAdministrationService) {
  }
  ngOnInit() {
  }
}
