import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {BookType} from '../../../../../core/model/bookType';
@Component({
  selector: 'app-book-type-gestion-list',
  templateUrl: './book-type-gestion-list.component.html'
})
export class BookTypeGestionListComponent implements OnInit {
  bookTypeList: Observable<BookType[]> = this.bookTypeAdministrationService.listFiltered;
  constructor(private bookTypeAdministrationService: BookTypeAdministrationService) {
  }
  ngOnInit(): void {
  }
}
