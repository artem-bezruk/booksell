import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookTypeGestionListComponent} from './book-type-gestion-list.component';
import {MockBookTypeEditionListDisplayComponent} from '../book-type-edition-list-display/__mocks__/book-type-edition-list-display.component';
import {MockBookTypeCreationListDisplayComponent} from '../book-type-creation-list-display/__mocks__/book-type-creation-list-display.component';
import {MatListModule} from '@angular/material/list';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {bookTypeAdministrationServiceMock} from '../../../../services/__mocks__/book-type-administration.service';
describe('BookTypeGestionListComponent', () => {
  let component: BookTypeGestionListComponent;
  let fixture: ComponentFixture<BookTypeGestionListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookTypeGestionListComponent, MockBookTypeCreationListDisplayComponent, MockBookTypeEditionListDisplayComponent],
      imports: [
        MatListModule
      ],
      providers: [
        {provide: BookTypeAdministrationService, useValue: bookTypeAdministrationServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookTypeGestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
