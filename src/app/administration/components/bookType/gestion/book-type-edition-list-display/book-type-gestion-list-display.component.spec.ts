import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeGestionListDisplayComponent } from './book-type-gestion-list-display.component';
describe('BookTypeGestionListDisplayComponent', () => {
  let component: BookTypeGestionListDisplayComponent;
  let fixture: ComponentFixture<BookTypeGestionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeGestionListDisplayComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeGestionListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
