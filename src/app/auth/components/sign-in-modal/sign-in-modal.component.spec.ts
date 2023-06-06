import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SignInModalComponent} from './sign-in-modal.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslateServiceMock} from '../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslatePipeMock} from '../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {CoreService} from '../../../core/services/core.service';
import {coreServiceMock} from '../../../core/services/__mocks__/core.service';
import {AuthService} from '../../services/auth.service';
import {authServiceMock} from '../../services/__mocks__/auth.service';
import {StatisticService} from '../../../book/services/statistic.service';
import {statisticServiceMock} from '../../../book/services/__mocks__/statistic.service';
import {MockBookCardComponent} from '../../../book/components/book-card/__mocks__/book-card.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('SignInModalComponent', () => {
  let component: SignInModalComponent;
  let fixture: ComponentFixture<SignInModalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInModalComponent,
        TranslatePipeMock],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: MatDialogRef},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
