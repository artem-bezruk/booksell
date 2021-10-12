import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLayoutComponent } from './book-layout.component';
import {CoreModule} from '../../../core/core.module';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
describe('BookLayoutComponent', () => {
  let component: BookLayoutComponent;
  let fixture: ComponentFixture<BookLayoutComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterModule],
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
