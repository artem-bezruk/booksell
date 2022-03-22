import {Component, Input, OnInit} from '@angular/core';
import {SeriesInfo} from '../../../core/model/series-by-editor-container';
@Component({
  selector: 'app-series-display',
  templateUrl: './series-display.component.html',
  styleUrls: ['./series-display.component.css']
})
export class SeriesDisplayComponent implements OnInit {
  @Input()
  series: string;
  @Input()
  seriesData: SeriesInfo;
  constructor() {
  }
  ngOnInit() {
  }
  getReadedBooksCount() {
    return this.seriesData.books.filter(b => b.status === 'READ').length;
  }
  getProgressValue(): number {
    const nbReadedBook = this.seriesData.books.filter(b => b.status === 'READ').length;
    console.log((nbReadedBook * 100) / this.seriesData.seriesBookCount);
    return (nbReadedBook * 100) / this.seriesData.seriesBookCount;
  }
}
