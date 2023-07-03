import {Component, Input, Output} from '@angular/core';
@Component({
  selector: 'app-book-edition-list-display',
  template: '<div>Mock Book Edition List Display</div>'
})
export class MockBookEditionListDisplayComponent {
  @Input()
  book: any;
  @Output()
  removeBook: any;
}
