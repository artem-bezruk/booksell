import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeCreationListDisplayComponent } from './book-type-creation-list-display.component';
describe('BookTypeCreationListDisplayComponent', () => {
  let component: BookTypeCreationListDisplayComponent;
  let fixture: ComponentFixture<BookTypeCreationListDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeCreationListDisplayComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeCreationListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
