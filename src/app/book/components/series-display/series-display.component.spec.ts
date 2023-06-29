import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesDisplayComponent } from './series-display.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslatePipeMock} from '../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateServiceMock} from '../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {AuthService} from '../../../auth/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {bookServiceMock} from '../../services/__mocks__/book.service';
import {BookService} from '../../services/book.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
describe('SeriesDisplayComponent', () => {
  let component: SeriesDisplayComponent;
  let fixture: ComponentFixture<SeriesDisplayComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesDisplayComponent, TranslatePipeMock ],
      imports: [
        NoopAnimationsModule,
        FontAwesomeTestingModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatMenuModule,
        MatListModule
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
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
