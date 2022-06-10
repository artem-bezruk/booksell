import {Component, EventEmitter, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-series-list-filter',
  templateUrl: './series-list-filter.component.html',
  styleUrls: ['./series-list-filter.component.css']
})
export class SeriesListFilterComponent implements OnInit {
  @Output()
  private filter: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
  }
}
