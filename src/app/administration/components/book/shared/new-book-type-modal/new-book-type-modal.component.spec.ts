import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewBookTypeModalComponent} from './new-book-type-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('NewBookTypeModalComponent', () => {
  let component: NewBookTypeModalComponent;
  let fixture: ComponentFixture<NewBookTypeModalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookTypeModalComponent ],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
