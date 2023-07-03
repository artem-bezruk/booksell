import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-book-type-creation-list-display',
  template: '<div>Mock Book Type Creation List Display</div>'
})
export class MockBookTypeCreationListDisplayComponent {
  @Input()
  bookType: any;
}
