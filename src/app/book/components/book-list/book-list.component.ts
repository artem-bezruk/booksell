import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {SeriesByGroupContainer} from '../../../core/model/series-by-group-container';
import {BookListService} from '../../services/book-list.service';
import {BookDetailsService} from '../../services/book-details.service';
import {BookDetailsEvent} from '../../models/book-details-event';
import {CoreService} from '../../../core/services/core.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  isLoading: Observable<boolean>;
  filteredBooks: Observable<SeriesByGroupContainer>;
  filteredGroupList: Observable<string[]>;
  displayDetails = false;
  constructor(private bookService: BookService, private bookListService: BookListService, private bookDetailsService: BookDetailsService,
              private coreService: CoreService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.bookListService.updateBookList(this.route.snapshot.paramMap.get('bookType'));
      }
    });
    this.isLoading = this.coreService.isLoading;
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
