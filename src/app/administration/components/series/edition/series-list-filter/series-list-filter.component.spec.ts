import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesListFilterComponent } from './series-list-filter.component';
describe('SeriesListFilterComponent', () => {
  let component: SeriesListFilterComponent;
  let fixture: ComponentFixture<SeriesListFilterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesListFilterComponent ]
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
