import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookEditionComponent } from './book-edition.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MockBookEditionListComponent} from '../book-edition-list/__mocks__/book-edition-list.component';
import {MockBookListFilterComponent} from '../../book-list-filter/__mocks__/book-list-filter.component';
import {MatListModule} from '@angular/material/list';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateLoaderMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate-loader.mock';
import {TranslatePipeMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.pipe.mock';
import {TranslateServiceMock} from '../../../../../../../__mocks__/@ngx-translate/core/translate.service.mock';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {CoreService} from '../../../../../core/services/core.service';
import {coreServiceMock} from '../../../../../core/services/__mocks__/core.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
describe('BookEditionComponent', () => {
  let component: BookEditionComponent;
  let fixture: ComponentFixture<BookEditionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditionComponent, MockBookEditionListComponent, MockBookListFilterComponent, TranslatePipeMock ],
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDialogModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: TranslatePipe, useClass: TranslatePipeMock},
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
        {provide: BookTypeAdministrationService, useValue: bookTypeAdministrationServiceMock},
        {provide: CoreService, useValue: coreServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
