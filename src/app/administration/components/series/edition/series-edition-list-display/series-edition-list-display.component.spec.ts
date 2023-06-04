import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesEditionListDisplayComponent } from './series-edition-list-display.component';
describe('SeriesEditionDisplayComponent', () => {
  let component: SeriesEditionListDisplayComponent;
  let fixture: ComponentFixture<SeriesEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionListDisplayComponent ]
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
