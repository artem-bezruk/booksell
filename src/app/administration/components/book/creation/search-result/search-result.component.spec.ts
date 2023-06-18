import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchResultComponent} from './search-result.component';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslateServiceMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {TranslatePipeMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {MockLoaderImgComponent} from '../../../../../shared/loader-img/__mocks__/loader-img.component';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {bookTypeServiceMock} from '../../../../../core/services/__mocks__/book-type.service';
describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent, MockLoaderImgComponent, TranslatePipeMock],
      imports: [
        NoopAnimationsModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
        MatListModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
        {provide: BookTypeService, useValue: bookTypeServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
