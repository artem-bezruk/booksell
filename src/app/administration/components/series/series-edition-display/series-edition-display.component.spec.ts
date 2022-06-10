import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesEditionDisplayComponent } from './series-edition-display.component';
describe('SeriesEditionDisplayComponent', () => {
  let component: SeriesEditionDisplayComponent;
  let fixture: ComponentFixture<SeriesEditionDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionDisplayComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
