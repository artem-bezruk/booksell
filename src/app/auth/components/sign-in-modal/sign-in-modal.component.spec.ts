import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SignInModalComponent} from './sign-in-modal.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from '../../services/auth.service';
import {authServiceMock} from '../../services/__mocks__/auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('SignInModalComponent', () => {
  let component: SignInModalComponent;
  let fixture: ComponentFixture<SignInModalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInModalComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxTranslateTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
      ],
      providers: [
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
