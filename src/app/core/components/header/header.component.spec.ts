import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';
import {MatMenuModule} from '@angular/material/menu';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslateServiceMock} from '../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslatePipeMock} from '../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {MockBookCardComponent} from '../../../book/components/book-card/__mocks__/book-card.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from '../../../auth/services/auth.service';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {BookTypeService} from '../../services/book-type.service';
import {bookTypeService} from '../../services/__mocks__/book-type.service';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent,
        TranslatePipeMock ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        MatButtonModule,
        RouterTestingModule,
        MatMenuModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: BookTypeService, useValue: bookTypeService},
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
