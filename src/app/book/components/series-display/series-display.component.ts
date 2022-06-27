import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {SeriesInfo} from '../../../core/model/series-by-group-container';
import {Book} from '../../../core/model/book';
import {MatAccordion, MatExpansionPanel} from '@angular/material';
import {BookDetailsEvent} from '../../models/book-details-event';
@Component({
  selector: 'app-series-display',
  templateUrl: './series-display.component.html',
  styleUrls: ['./series-display.component.css'],
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
  showDetails(bookIndex: number) {
    this.showBookDetails.emit({bookIndex});
  }
  getPanelState(): boolean {
    return this.matExpansionPanel.expanded;
  }
}
