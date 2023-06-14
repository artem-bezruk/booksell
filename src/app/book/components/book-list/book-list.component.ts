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
  isLoading: Observable<boolean> = this.coreService.isLoading;
  filteredBooks: Observable<SeriesByGroupContainer> = this.bookListService.filteredBooks;
  filteredGroupList: Observable<string[]> = this.bookListService.filteredGroupList;
  displayDetails = false;
  constructor(private bookService: BookService,
              private bookListService: BookListService,
              private bookDetailsService: BookDetailsService,
              private coreService: CoreService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.bookListService.updateBookList(this.route.snapshot.paramMap.get('bookType'));
      }
    });
  }
  ngOnInit() {
    this.bookDetailsService.bookToDisplay.subscribe(res => this.displayDetails = res !== null);
  }
  showDetails(bookDetailsEvent: BookDetailsEvent, group: string | null = null) {
    if (group !== null) {
      bookDetailsEvent.group = group;
    }
    this.bookDetailsService.showDetails(bookDetailsEvent);
  }
  clearBookToDisplay() {
    this.bookDetailsService.clearBookToDisplay();
  }
}
