import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from 'src/app/core/model/book';
@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit {
  @Input()
  book: Book;
  @Output()
  showBookDetails: EventEmitter<Book> = new EventEmitter<Book>();
  constructor() { }
  ngOnInit() {
  }
  openDetails(book: Book) {
    console.log('tset');
    this.showBookDetails.emit(book);
  }
}
