import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesEditionListComponent } from './series-edition-list.component';
describe('SeriesListComponent', () => {
  let component: SeriesEditionListComponent;
  let fixture: ComponentFixture<SeriesEditionListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditionListComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
