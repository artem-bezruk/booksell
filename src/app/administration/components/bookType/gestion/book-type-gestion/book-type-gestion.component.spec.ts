import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookTypeGestionComponent} from './book-type-gestion.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxTranslateTestingModule} from '../../../../../../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {MockBookTypeGestionListComponent} from '../book-type-gestion-list/__mocks__/book-type-gestion-list.component';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
describe('BookTypeGestionComponent', () => {
  let component: BookTypeGestionComponent;
  let fixture: ComponentFixture<BookTypeGestionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTypeGestionComponent, MockBookTypeGestionListComponent ],
      imports: [
        NgxTranslateTestingModule,
        FlexLayoutModule,
        MatProgressBarModule
      ],
      providers: [
        {provide: BookTypeAdministrationService, useValue: bookTypeAdministrationServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
