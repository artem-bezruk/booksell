import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookDetailsComponent} from './book-details.component';
import {MatListModule} from '@angular/material/list';
import {MockLoaderImgComponent} from '../../../shared/loader-img/__mocks__/loader-img.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BookDetailsService} from '../../services/book-details.service';
import {bookDetailsServiceMock} from '../../services/__mocks__/book-details.service';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent, MockLoaderImgComponent],
      imports: [
        NgxTranslateTestingModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        MatListModule,
      ],
      providers: [
        {provide: BookDetailsService, useValue: bookDetailsServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
