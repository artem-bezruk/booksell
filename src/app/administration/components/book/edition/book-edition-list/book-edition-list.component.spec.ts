import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookEditionListComponent } from './book-edition-list.component';
describe('BookEditionListComponent', () => {
  let component: BookEditionListComponent;
  let fixture: ComponentFixture<BookEditionListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditionListComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
