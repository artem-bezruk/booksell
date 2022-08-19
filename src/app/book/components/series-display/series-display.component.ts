import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {SeriesInfo} from '../../../core/model/series-by-group-container';
import {Book} from '../../../core/model/book';
import {MatAccordion, MatExpansionPanel, MatListOption, MatSelectionListChange} from '@angular/material';
import {BookDetailsEvent} from '../../models/book-details-event';
import {AuthService} from '../../../auth/services/auth.service';
import {BookService} from '../../services/book.service';
@Component({
  selector: 'app-series-display',
  templateUrl: './series-display.component.html',
  styleUrls: ['./series-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SeriesDisplayComponent implements OnInit {
  @ViewChild(MatExpansionPanel, {static: false}) matExpansionPanel: MatExpansionPanel;
  @Input()
  series: string;
  @Input()
  seriesData: SeriesInfo;
  @Output()
  showBookDetails: EventEmitter<BookDetailsEvent> = new EventEmitter<BookDetailsEvent>();
  constructor(private authService: AuthService, private bookService: BookService) { }
  ngOnInit() {
  }
  getReadedBooksCount() {
    return this.seriesData.books.filter(b => b.status === 'READ').length;
  }
  getProgressValue(): number {
    return (this.seriesData.books.filter(b => b.status === 'READ').length * 100) / this.seriesData.seriesBookCount;
  }
  showDetails(bookIndex: number) {
    this.showBookDetails.emit({bookIndex});
  }
  getPanelState(): boolean {
    return this.matExpansionPanel.expanded;
  }
  userConnected() {
    return this.authService.currentUser;
  }
  changeBookState(selected: MatListOption[], newState: 'UNREAD' | 'READING' | 'READ') {
    const books: Book[] = selected.map( matOption => {
      const book: Book = Object.assign({}, matOption.value);
      book.status = newState;
      return book;
    });
    this.bookService.bulkUpdateUpdate(books);
  }
}
