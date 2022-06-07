import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesEditionComponent } from './series-edition.component';
describe('SeriesEditionComponent', () => {
  let component: SeriesEditionComponent;
  let fixture: ComponentFixture<SeriesEditionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
