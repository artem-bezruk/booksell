import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GroupDisplayComponent} from './group-display.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BookService} from '../../services/book.service';
import {bookServiceMock} from '../../services/__mocks__/book.service';
import {BookListService} from '../../services/book-list.service';
import {bookListServiceMock} from '../../services/__mocks__/book-list.service';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MockSeriesDisplayComponent} from '../series-display/__mocks__/series-display.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('GroupDisplayComponent', () => {
  let component: GroupDisplayComponent;
  let fixture: ComponentFixture<GroupDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDisplayComponent, MockSeriesDisplayComponent],
      imports: [
        FlexLayoutModule,
        NgxTranslateTestingModule,
        FontAwesomeTestingModule,
        MatExpansionModule
      ],
      providers: [
        {provide: BookService, useValue: bookServiceMock},
        {provide: BookListService, useValue: bookListServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
