import {Component, OnInit} from '@angular/core';
import {Book} from '../../../core/model/book';
import {BookDetailsEvent} from '../../models/book-details-event';
import {BookDetailsService} from '../../services/book-details.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookEvent: { book: Book, asNext: BookDetailsEvent, asPrevious: BookDetailsEvent } | null = null;
  public displayImg = false;
  constructor(private bookDetailsService: BookDetailsService) { }
  ngOnInit() {
    this.bookDetailsService.bookToDisplay.subscribe(next => {
      this.displayImg = true;
      this.bookEvent = next;
    });
  }
  changeBook(bookDetailsEvent: BookDetailsEvent) {
    this.displayImg = false;
    this.bookDetailsService.showDetails(bookDetailsEvent);
  }
}
