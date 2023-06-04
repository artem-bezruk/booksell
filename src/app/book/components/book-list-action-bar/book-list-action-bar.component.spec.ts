import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListActionBarComponent } from './book-list-action-bar.component';
describe('BookListActionBarComponent', () => {
  let component: BookListActionBarComponent;
  let fixture: ComponentFixture<BookListActionBarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListActionBarComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookListActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
