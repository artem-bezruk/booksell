import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-book-type-edition-list-display',
  template: '<div>Mock Book Type Edition List Display</div>'
})
export class MockBookTypeEditionListDisplayComponent {
  @Input()
  bookType: any;
}
