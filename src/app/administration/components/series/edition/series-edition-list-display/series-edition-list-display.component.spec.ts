import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SeriesEditionListDisplayComponent} from './series-edition-list-display.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {seriesAdministrationServiceMock} from '../../../../services/__mocks__/series-administration.service';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('SeriesEditionListDisplayComponent', () => {
  let component: SeriesEditionListDisplayComponent;
  let fixture: ComponentFixture<SeriesEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionListDisplayComponent ],
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
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
