import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesDisplayComponent } from './series-display.component';
describe('SeriesDisplayComponent', () => {
  let component: SeriesDisplayComponent;
  let fixture: ComponentFixture<SeriesDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesDisplayComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
