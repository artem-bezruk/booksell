import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookListActionBarComponent} from './book-list-action-bar.component';
import {BookListService} from '../../services/book-list.service';
import {bookListServiceMock} from '../../services/__mocks__/book-list.service';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
describe('BookListActionBarComponent', () => {
  let component: BookListActionBarComponent;
  let fixture: ComponentFixture<BookListActionBarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListActionBarComponent],
      imports: [
        FontAwesomeTestingModule,
        FlexLayoutModule,
        NgxTranslateTestingModule,
        MatSlideToggleModule,
        MatButtonModule
      ],
      providers: [
        {provide: BookListService, useValue: bookListServiceMock},
      ]
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
