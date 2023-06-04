import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeGestionListComponent } from './book-type-gestion-list.component';
describe('BookTypeGestionListComponent', () => {
  let component: BookTypeGestionListComponent;
  let fixture: ComponentFixture<BookTypeGestionListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeGestionListComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeGestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
