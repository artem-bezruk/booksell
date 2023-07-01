import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SeriesDisplayComponent} from './series-display.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {AuthService} from '../../../auth/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {bookServiceMock} from '../../services/__mocks__/book.service';
import {BookService} from '../../services/book.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('SeriesDisplayComponent', () => {
  let component: SeriesDisplayComponent;
  let fixture: ComponentFixture<SeriesDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesDisplayComponent],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        FontAwesomeTestingModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatMenuModule,
        MatListModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: BookService, useValue: bookServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
