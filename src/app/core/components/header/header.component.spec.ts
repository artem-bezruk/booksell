import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../auth/services/auth.service';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {BookTypeService} from '../../services/book-type.service';
import {bookTypeServiceMock} from '../../services/__mocks__/book-type.service';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        FontAwesomeTestingModule,
        NgxTranslateTestingModule,
        RouterTestingModule,
        FlexLayoutModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: BookTypeService, useValue: bookTypeServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
