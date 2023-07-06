import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesEditionListComponent } from './series-edition-list.component';
import {MatListModule} from '@angular/material/list';
import {seriesAdministrationServiceMock} from '../../../../services/__mocks__/series-administration.service';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {MockSeriesEditionListDisplayComponent} from '../series-edition-list-display/__mocks__/series-edition-list-display.component';
describe('SeriesEditionListComponent', () => {
  let component: SeriesEditionListComponent;
  let fixture: ComponentFixture<SeriesEditionListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionListComponent, MockSeriesEditionListDisplayComponent ],
      imports: [
        MatListModule
      ],
      providers: [
        {provide: SeriesAdministrationService, useValue: seriesAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
