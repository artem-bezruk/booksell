import {Component, OnInit} from '@angular/core';
import {Book} from '../../../../../core/model/book';
import {Observable} from 'rxjs';
import {BookAdministrationService} from '../../../../services/book-administration.service';
@Component({
  selector: 'app-book-edition-list',
  templateUrl: './book-edition-list.component.html',
  styleUrls:  ['../../../../administration-edition.scss']
})
export class BookEditionListComponent implements OnInit {
  bookList: Observable<Book[]> = this.bookAdministrationService.listFiltered;
  constructor(private bookAdministrationService: BookAdministrationService) {
  }
  ngOnInit() {
  }
  onBookRemoval(event: Book) {
    this.bookAdministrationService.delete(event);
  }
}
