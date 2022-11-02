import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {BookBySeriesContainer} from '../../../core/model/series-by-group-container';
import {Utils} from '../../../shared/utils';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from '../../../core/model/book';
import {MatAccordion} from '@angular/material';
import {SeriesDisplayComponent} from '../series-display/series-display.component';
import {BookDetailsEvent} from '../../models/book-details-event';
@Component({
  selector: 'app-group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.css']
})
export class GroupDisplayComponent implements OnInit {
  @ViewChild(MatAccordion, {static: false}) accordion!: MatAccordion;
  @ViewChildren(SeriesDisplayComponent) series: SeriesDisplayComponent[] = [];
  @Input()
  editor: string | null = null;
  @Output()
  showBookDetails: EventEmitter<BookDetailsEvent> = new EventEmitter<BookDetailsEvent>();
  constructor() {
  }
  private _orderedSeries: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get orderedSeries(): Observable<string[]> {
    return this._orderedSeries.asObservable();
  }
  private _bookBySeries: BehaviorSubject<BookBySeriesContainer[]> = new BehaviorSubject<BookBySeriesContainer[]>([]);
  get bookBySeries(): Observable<BookBySeriesContainer[]> {
    return this._bookBySeries.asObservable();
  }
  @Input()
  set seriesContainer(series: BookBySeriesContainer[]) {
    if (series !== null) {
      this._orderedSeries.next(Utils.orderStringList(Object.keys(series)));
      this._bookBySeries.next(series);
    }
  }
  ngOnInit() {
  }
  showDetails(bookDetailsEvent: BookDetailsEvent, series: string) {
    bookDetailsEvent.series = series;
    this.showBookDetails.emit(bookDetailsEvent);
  }
  isAllPanelOpened() {
    let state = true;
    this.series.forEach(panel => {
      state = state && panel.getPanelState();
    });
    return state;
  }
}
