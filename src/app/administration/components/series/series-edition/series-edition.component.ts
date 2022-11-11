import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {SeriesAdministrationService} from '../../../services/series-administration.service';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../../../core/services/core.service';
@Component({
  selector: 'app-series-edition',
  templateUrl: './series-edition.component.html',
  styleUrls: ['./series-edition.component.css']
})
export class SeriesEditionComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private seriesService: SeriesAdministrationService, private coreService: CoreService) { }
  ngOnInit() {
    this.seriesService.seriesList.subscribe(next => {
      return this.hasResult = next !== null});
    this.seriesService.getAllSeries();
    this.seriesService.filter('');
  }
  onFilter($event: string) {
    this.seriesService.filter($event);
  }
}
