import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookEditionListComponent} from './book-edition-list.component';
import {MockBookEditionListDisplayComponent} from '../book-edition-list-display/__mocks__/book-edition-list-display.component';
import {MatListModule} from '@angular/material/list';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {bookAdministrationServiceMock} from '../../../../services/__mocks__/book-administration.service';
describe('BookEditionListComponent', () => {
  let component: BookEditionListComponent;
  let fixture: ComponentFixture<BookEditionListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditionListComponent, MockBookEditionListDisplayComponent ],
      imports: [
        MatListModule
      ],
      providers: [
        {provide: BookAdministrationService, useValue: bookAdministrationServiceMock},
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
