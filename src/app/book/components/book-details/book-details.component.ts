import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../core/model/book';
import {BookDetailsEvent} from '../../models/book-details-event';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input()
  bookEvent: { book: Book, asNext: BookDetailsEvent, asPrevious: BookDetailsEvent };
  @Output()
  private updateBookDetails: EventEmitter<BookDetailsEvent> = new EventEmitter<BookDetailsEvent>();
  constructor() { }
  ngOnInit() {
  }
  changeBook(bookDetailsEvent: BookDetailsEvent) {
    this.updateBookDetails.emit(bookDetailsEvent);
  }
}
