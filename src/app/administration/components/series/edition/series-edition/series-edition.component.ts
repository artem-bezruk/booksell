import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {CoreService} from '../../../../../core/services/core.service';
@Component({
  selector: 'app-series-edition',
  templateUrl: './series-edition.component.html'
})
export class SeriesEditionComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private seriesService: SeriesAdministrationService, private coreService: CoreService) { }
  ngOnInit() {
    this.seriesService.list.subscribe(next => this.hasResult = next !== null);
    this.seriesService.getAll();
  }
  onFilter($event: string) {
    this.seriesService.filter($event);
  }
}
