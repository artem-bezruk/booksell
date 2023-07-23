import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlphabeticalSeriesDisplayComponent} from './alphabetical-series-display.component';
describe('AlphabeticalSeriesDisplayComponent', () => {
  let component: AlphabeticalSeriesDisplayComponent;
  let fixture: ComponentFixture<AlphabeticalSeriesDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabeticalSeriesDisplayComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabeticalSeriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
