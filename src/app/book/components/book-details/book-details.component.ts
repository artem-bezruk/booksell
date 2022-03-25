import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../core/model/book';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input()
  book: Book;
  constructor() { }
  ngOnInit() {
  }
}
