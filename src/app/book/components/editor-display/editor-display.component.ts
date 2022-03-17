import {Component, Input, OnInit} from '@angular/core';
import {BookBySeriesContainer} from '../../../core/model/series-by-editor-container';
import {Utils} from '../../../shared/utils';
import {BehaviorSubject, Observable} from 'rxjs';
@Component({
  selector: 'app-editor-display',
  templateUrl: './editor-display.component.html',
  styleUrls: ['./editor-display.component.css']
})
export class EditorDisplayComponent implements OnInit {
  @Input()
  editor: string;
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
}
