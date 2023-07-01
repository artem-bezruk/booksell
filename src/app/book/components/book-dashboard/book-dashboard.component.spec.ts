import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookDashboardComponent} from './book-dashboard.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MockBookCardComponent} from '../book-card/__mocks__/book-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreService} from '../../../core/services/core.service';
import {AuthService} from '../../../auth/services/auth.service';
import {StatisticService} from '../../services/statistic.service';
import {coreServiceMock} from '../../../core/services/__mocks__/core.service';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {statisticServiceMock} from '../../services/__mocks__/statistic.service';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('BookDashboardComponent', () => {
  let component: BookDashboardComponent;
  let fixture: ComponentFixture<BookDashboardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDashboardComponent, MockBookCardComponent],
      imports: [
        FontAwesomeTestingModule,
        NgxTranslateTestingModule,
        NgxChartsModule,
        RouterTestingModule,
        MatProgressBarModule,
      ],
      providers: [
        {provide: CoreService, useValue: coreServiceMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: StatisticService, useValue: statisticServiceMock}
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
