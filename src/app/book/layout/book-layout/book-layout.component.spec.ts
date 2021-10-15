import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLayoutComponent } from './book-layout.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
describe('BookLayoutComponent', () => {
  let component: BookLayoutComponent;
  let fixture: ComponentFixture<BookLayoutComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ BookLayoutComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
