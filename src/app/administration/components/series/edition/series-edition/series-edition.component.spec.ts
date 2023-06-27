import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesEditionComponent } from './series-edition.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {seriesAdministrationServiceMock} from '../../../../services/__mocks__/series-administration.service';
import {MockSeriesListFilterComponent} from '../series-list-filter/__mocks__/series-list-filter.component';
import {BookService} from '../../../../../book/services/book.service';
import {bookServiceMock} from '../../../../../book/services/__mocks__/book.service';
import {BookListService} from '../../../../../book/services/book-list.service';
import {bookListServiceMock} from '../../../../../book/services/__mocks__/book-list.service';
import {TranslatePipeMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {MockSeriesEditionListComponent} from '../series-edition-list/__mocks__/series-edition-list.component';
describe('SeriesEditionComponent', () => {
  let component: SeriesEditionComponent;
  let fixture: ComponentFixture<SeriesEditionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionComponent, MockSeriesListFilterComponent, TranslatePipeMock, MockSeriesEditionListComponent ],
      imports: [
        MatProgressBarModule
      ],
      providers: [
        {provide: BookService, useValue: bookServiceMock},
        {provide: BookListService, useValue: bookListServiceMock},
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
