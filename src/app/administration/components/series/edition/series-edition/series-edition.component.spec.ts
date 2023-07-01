import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SeriesEditionComponent} from './series-edition.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {seriesAdministrationServiceMock} from '../../../../services/__mocks__/series-administration.service';
import {MockSeriesListFilterComponent} from '../series-list-filter/__mocks__/series-list-filter.component';
import {MockSeriesEditionListComponent} from '../series-edition-list/__mocks__/series-edition-list.component';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('SeriesEditionComponent', () => {
  let component: SeriesEditionComponent;
  let fixture: ComponentFixture<SeriesEditionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesEditionComponent, MockSeriesListFilterComponent, MockSeriesEditionListComponent],
      imports: [
        NgxTranslateTestingModule,
        MatProgressBarModule,
      ],
      providers: [
        {provide: SeriesAdministrationService, useValue: seriesAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
