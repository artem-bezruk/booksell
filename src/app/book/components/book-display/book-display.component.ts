import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from 'src/app/core/model/book';
import {BookDetailsEvent} from '../../models/book-details-event';
@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit {
  @Input()
  book: Book;
  @Output()
  showBookDetails: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
  ngOnInit() {
  }
  openDetails() {
    this.showBookDetails.emit();
  }
}
