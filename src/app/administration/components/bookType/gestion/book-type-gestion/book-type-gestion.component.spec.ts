import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeGestionComponent } from './book-type-gestion.component';
describe('BookTypeGestionComponent', () => {
  let component: BookTypeGestionComponent;
  let fixture: ComponentFixture<BookTypeGestionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeGestionComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
