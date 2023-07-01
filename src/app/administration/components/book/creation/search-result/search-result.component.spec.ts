import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchResultComponent} from './search-result.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MockLoaderImgComponent} from '../../../../../shared/loader-img/__mocks__/loader-img.component';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {bookTypeServiceMock} from '../../../../../core/services/__mocks__/book-type.service';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent, MockLoaderImgComponent],
      imports: [
        NoopAnimationsModule,
        NgxTranslateTestingModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
        MatListModule
      ],
      providers: [
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
