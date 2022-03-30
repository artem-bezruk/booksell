import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SeriesInfo} from '../../../core/model/series-by-editor-container';
import {Book} from '../../../core/model/book';
@Component({
  selector: 'app-series-display',
  templateUrl: './series-display.component.html',
  styleUrls: ['./series-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SeriesDisplayComponent implements OnInit {
  @Input()
  series: string;
  @Input()
  seriesData: SeriesInfo;
  @Output()
  showBookDetails: EventEmitter<Book> = new EventEmitter<Book>();
  constructor() {
  }
  ngOnInit() {
  }
  getReadedBooksCount() {
    return this.seriesData.books.filter(b => b.status === 'READ').length;
  }
  getProgressValue(): number {
    return (this.seriesData.books.filter(b => b.status === 'READ').length * 100) / this.seriesData.seriesBookCount;
  }
  showDetails(book: Book) {
    this.showBookDetails.emit(book);
  }
}
