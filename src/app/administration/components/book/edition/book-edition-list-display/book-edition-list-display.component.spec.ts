import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookEditionListDisplayComponent } from './book-edition-list-display.component';
describe('BookEditionListDisplayComponent', () => {
  let component: BookEditionListDisplayComponent;
  let fixture: ComponentFixture<BookEditionListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditionListDisplayComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditionListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
