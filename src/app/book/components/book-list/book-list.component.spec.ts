import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookListComponent} from './book-list.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MockListFilterComponent} from '../list-filter/__mocks__/list-filter.component';
import {MockBookDetailsComponent} from '../book-details/__mocks__/book-details.component';
import {MockGroupDisplayComponent} from '../group-display/__mocks__/group-display.component';
import {MockBookListActionBarComponent} from '../book-list-action-bar/__mocks__/book-list-action-bar.component';
import {BookService} from '../../services/book.service';
import {BookListService} from '../../services/book-list.service';
import {BookDetailsService} from '../../services/book-details.service';
import {CoreService} from '../../../core/services/core.service';
import {coreServiceMock} from '../../../core/services/__mocks__/core.service';
import {bookServiceMock} from '../../services/__mocks__/book.service';
import {bookListServiceMock} from '../../services/__mocks__/book-list.service';
import {bookDetailsServiceMock} from '../../services/__mocks__/book-details.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookListComponent,
        MockListFilterComponent,
        MockBookDetailsComponent,
        MockGroupDisplayComponent,
        MockBookListActionBarComponent
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatProgressBarModule,
        MatSidenavModule
      ],
      providers: [
        {provide: BookService, useValue: bookServiceMock},
        {provide: BookListService, useValue: bookListServiceMock},
        {provide: BookDetailsService, useValue: bookDetailsServiceMock},
        {provide: CoreService, useValue: coreServiceMock}
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
