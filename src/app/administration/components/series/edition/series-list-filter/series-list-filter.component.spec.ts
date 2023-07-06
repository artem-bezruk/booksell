import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SeriesListFilterComponent} from './series-list-filter.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('SeriesListFilterComponent', () => {
  let component: SeriesListFilterComponent;
  let fixture: ComponentFixture<SeriesListFilterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesListFilterComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgxTranslateTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
