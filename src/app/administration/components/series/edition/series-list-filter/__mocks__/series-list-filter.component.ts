import {Component, EventEmitter, Output} from '@angular/core';
@Component({
  selector: 'app-series-list-filter',
  template: '<div>Mock Series List Filter</div> '
})
export class MockSeriesListFilterComponent {
  @Output()
  private filter: EventEmitter<string> = new EventEmitter<string>();
}
