import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from './book-details.component';
import {MatListModule} from '@angular/material/list';
import {TranslatePipeMock} from '../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {MockLoaderImgComponent} from '../../../shared/loader-img/__mocks__/loader-img.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslateServiceMock} from '../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {CoreService} from '../../../core/services/core.service';
import {coreServiceMock} from '../../../core/services/__mocks__/core.service';
import {AuthService} from '../../../auth/services/auth.service';
import {authServiceMock} from '../../../auth/services/__mocks__/auth.service';
import {StatisticService} from '../../services/statistic.service';
import {statisticServiceMock} from '../../services/__mocks__/statistic.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BookDetailsService} from '../../services/book-details.service';
import {bookDetailsServiceMock} from '../../services/__mocks__/book-details.service';
describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent, TranslatePipeMock, MockLoaderImgComponent ],
      imports: [
        MatListModule,
        FontAwesomeTestingModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
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
