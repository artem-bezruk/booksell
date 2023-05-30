import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../core/model/book';
import {Series} from '../../../core/model/series';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input()
  book: Book;
  constructor() {
  }
  ngOnInit(): void {
  }
  isOneShot(series: Series) {
    return series.name === 'One-shot'
  }
}
