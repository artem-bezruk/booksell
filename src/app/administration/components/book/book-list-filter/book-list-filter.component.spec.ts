import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookListFilterComponent} from './book-list-filter.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxTranslateTestingModule} from '../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
describe('BookListFilterComponent', () => {
  let component: BookListFilterComponent;
  let fixture: ComponentFixture<BookListFilterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListFilterComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgxTranslateTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
