import {Component, OnInit} from '@angular/core';
import {StatisticService} from '../../services/statistic.service';
import {Observable} from 'rxjs';
import {CoreService} from '../../../core/services/core.service';
import {Statistics} from '../../../core/model/statistics';
import {AuthService} from '../../../auth/services/auth.service';
@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.scss']
})
export class BookDashboardComponent implements OnInit {
  public statistics: Observable<Statistics> = this.statisticService.searchResult;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private statisticService: StatisticService,
              private coreService: CoreService,
              private authService: AuthService) {
  }
  ngOnInit() {
    this.statisticService.getAllStats();
  }
  statusLabelFormat(c: any): string {
    return `${c.label}<br/><small class="number-card-label">${c.data.extra.editor}</small>`;
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
