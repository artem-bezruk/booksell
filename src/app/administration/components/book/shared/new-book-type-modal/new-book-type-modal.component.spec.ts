import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBookTypeModalComponent } from './new-book-type-modal.component';
describe('NewBookTypeModalComponent', () => {
  let component: NewBookTypeModalComponent;
  let fixture: ComponentFixture<NewBookTypeModalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookTypeModalComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
