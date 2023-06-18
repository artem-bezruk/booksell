import {Component, EventEmitter, Output} from '@angular/core';
@Component({
  selector: 'app-book-list-filter',
  template: '<div>Mock Book List Filter</div>'
})
export class MockBookListFilterComponent {
  @Output()
  private filter: EventEmitter<string> = new EventEmitter<string>();
}
