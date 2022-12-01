import { Component, OnInit } from '@angular/core';
import {StatisticService} from '../../services/statistic.service';
import {Observable} from 'rxjs';
import {StatDTO} from '../../../core/model/statDTO';
@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {
  public statistics: Observable<StatDTO> = this.statisticService.searchResult;
  constructor(private statisticService: StatisticService) { }
  ngOnInit() {
    this.statisticService.getAllStats();
  }
}
