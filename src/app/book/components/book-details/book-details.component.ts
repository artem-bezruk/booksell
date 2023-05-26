import {Component, OnInit} from '@angular/core';
import {Book} from '../../../core/model/book';
import {BookDetailsEvent} from '../../models/book-details-event';
import {BookDetailsService} from '../../services/book-details.service';
import {DisplayImage} from '../../../shared/display-image';
import {Series} from '../../../core/model/series';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent extends DisplayImage implements OnInit {
  bookEvent: { book: Book | null, asNext: BookDetailsEvent | null, asPrevious: BookDetailsEvent | null } | null = null;
  public displayImg = false;
  constructor(private bookDetailsService: BookDetailsService) {
    super('/files/covers')
  }
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
  isOneShot(series: Series) {
    return series.name === 'One-shot'
  }
}
