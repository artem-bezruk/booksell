import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookEditionComponent} from './book-edition.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MockBookEditionListComponent} from '../book-edition-list/__mocks__/book-edition-list.component';
import {MockBookListFilterComponent} from '../../book-list-filter/__mocks__/book-list-filter.component';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {CoreService} from '../../../../../core/services/core.service';
import {coreServiceMock} from '../../../../../core/services/__mocks__/core.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('BookEditionComponent', () => {
  let component: BookEditionComponent;
  let fixture: ComponentFixture<BookEditionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditionComponent, MockBookEditionListComponent, MockBookListFilterComponent],
      imports: [
        FlexLayoutModule,
        NgxTranslateTestingModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
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
