import {Component, Input, OnInit} from '@angular/core';
import {BookBySeriesContainer} from '../../../core/model/seriesByEditorContainer';
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
  constructor() { }
  ngOnInit() {
  }
}
