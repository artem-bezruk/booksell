import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IsbnSearchComponent} from './isbn-search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('IsbnSearchComponent', () => {
  let component: IsbnSearchComponent;
  let fixture: ComponentFixture<IsbnSearchComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsbnSearchComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgxTranslateTestingModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        MatIconModule,
      ],
      providers: [
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(IsbnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
