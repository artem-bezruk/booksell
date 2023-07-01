import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ListFilterComponent} from './list-filter.component';
import {BookService} from '../../services/book.service';
import {bookServiceMock} from '../../services/__mocks__/book.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('ListFilterComponent', () => {
  let component: ListFilterComponent;
  let fixture: ComponentFixture<ListFilterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListFilterComponent],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
      ],
      providers: [
        {provide: BookService, useValue: bookServiceMock}
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
