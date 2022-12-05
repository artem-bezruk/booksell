import {Component, OnInit} from '@angular/core';
import {StatisticService} from '../../services/statistic.service';
import {Observable} from 'rxjs';
import {StatDTO} from '../../../core/model/statDTO';
import {CoreService} from '../../../core/services/core.service';
@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {
  public statistics: Observable<StatDTO> = this.statisticService.searchResult;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private statisticService: StatisticService,
              private coreService: CoreService
  ) {
  }
  ngOnInit() {
    this.statisticService.getAllStats();
  }
}
