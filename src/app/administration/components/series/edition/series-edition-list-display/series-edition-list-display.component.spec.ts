import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SeriesEditionListDisplayComponent} from './series-edition-list-display.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {seriesAdministrationServiceMock} from '../../../../services/__mocks__/series-administration.service';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), 
    removeListener: jest.fn(), 
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
describe('SeriesEditionListDisplayComponent', () => {
  let component: SeriesEditionListDisplayComponent;
  let fixture: ComponentFixture<SeriesEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesEditionListDisplayComponent],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatListModule
      ],
      providers: [
        {provide: SeriesAdministrationService, useValue: seriesAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditionListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Business test', () => {
    test('should return the progress bar value', () => {
      component[`time`] = 6;
      expect(component.getProgressBarValue(3)).toStrictEqual(50);
    });
    test('should call the update method on service', () => {
      component.progressBarState = {display: false, type: 'indeterminate'};
      const series = {seriesBookCount: 0, displayName: 'SeriesDisplay', name: 'Series', editor: 'editor', id: 200};
      component.series = series;
      component.form = new FormGroup({
        displayName: new FormControl(series.displayName + 'Updated'),
        seriesBookCount: new FormControl(series.seriesBookCount)
      });
      component.submit();
      expect(seriesAdministrationServiceMock.update).toHaveBeenNthCalledWith(1,
        {...series, displayName: series.displayName + 'Updated'}
      );
      expect(component.progressBarState).toStrictEqual({display: false, type: 'indeterminate'});
      expect(component[`isSaved$`]).toBeTruthy();
      expect(component.series).toStrictEqual({...series, displayName: series.displayName + 'Updated'});
    });
  });
});
