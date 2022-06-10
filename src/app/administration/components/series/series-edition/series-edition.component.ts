import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {SeriesAdministrationService} from '../../../services/series-administration.service';
@Component({
  selector: 'app-series-edition',
  templateUrl: './series-edition.component.html',
  styleUrls: ['./series-edition.component.css']
})
export class SeriesEditionComponent implements OnInit {
  hasResult: boolean;
  isLoading: Observable<boolean>;
  constructor(private seriesService: SeriesAdministrationService) { }
  ngOnInit() {
    this.seriesService.seriesList.subscribe(next => this.hasResult = next !== null);
    this.seriesService.getAllSeries();
    this.isLoading = this.seriesService.isLoading;
  }
  onFilter($event) {
    this.seriesService.filter($event);
  }
}
