import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {AuthService} from '../../../auth/services/auth.service';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NgxTranslateTestingModule} from '../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        MatDialogModule,
        NgxTranslateTestingModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: MatDialogRef},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
