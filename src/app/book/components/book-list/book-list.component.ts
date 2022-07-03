import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {SeriesByGroupContainer} from '../../../core/model/series-by-group-container';
import {BookListService} from '../../services/book-list.service';
import {BookDetailsService} from '../../services/book-details.service';
import {BookDetailsEvent} from '../../models/book-details-event';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  groupByEditors: boolean;
  isLoading: Observable<boolean>;
  filteredBooks: Observable<SeriesByGroupContainer>;
  filteredGroupList: Observable<string[]>;
  displayDetails = false;
  constructor(private bookService: BookService, private bookListService: BookListService, private bookDetailsService: BookDetailsService) {
  }
  ngOnInit() {
    this.isLoading = this.bookService.isLoading;
    this.filteredGroupList = this.bookListService.filteredGroupList;
    this.filteredBooks = this.bookListService.filteredBooks;
    this.bookDetailsService.bookToDisplay.subscribe(res => this.displayDetails = res !== null);
  }
  showDetails(bookDetailsEvent: BookDetailsEvent, group: string = null) {
    if (group !== null) {
      bookDetailsEvent.group = group;
    }
    this.bookDetailsService.showDetails(bookDetailsEvent);
  }
  clearBookToDisplay() {
    this.bookDetailsService.clearBookToDisplay();
  }
}
