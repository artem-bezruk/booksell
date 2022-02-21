import {Component, Input, OnInit} from '@angular/core';
import {Book} from 'src/app/core/model/book';
@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit {
  @Input()
  book: Book;
  constructor() { }
  ngOnInit() {
  }
}
