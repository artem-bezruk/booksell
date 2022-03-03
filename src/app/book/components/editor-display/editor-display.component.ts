import {Component, Input, OnInit} from '@angular/core';
import {BookBySeriesContainer} from '../../../core/model/seriesByEditorContainer';
import {BookFilter} from '../../../core/model/book-filter';
@Component({
  selector: 'app-editor-display',
  templateUrl: './editor-display.component.html',
  styleUrls: ['./editor-display.component.css']
})
export class EditorDisplayComponent implements OnInit {
  @Input()
  editor: string;
  @Input()
  series: BookBySeriesContainer[];
  @Input()
  filters: BookFilter;
  constructor() { }
  ngOnInit() {
  }
}
