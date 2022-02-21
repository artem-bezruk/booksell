import {Component, Input, OnInit} from '@angular/core';
import {BookBySeriesContainer} from '../../../core/model/seriesByEditorContainer';
import {Book} from '../../../core/model/book';
@Component({
  selector: 'app-series-display',
  templateUrl: './series-display.component.html',
  styleUrls: ['./series-display.component.css']
})
export class SeriesDisplayComponent implements OnInit {
  @Input()
  series: string;
  @Input()
  books: Book[];
  constructor() { }
  ngOnInit() {
  }
}
