import {Component, Input} from '@angular/core';
import {Book} from '../../../../core/model/book';
@Component({
  selector: 'app-book-card',
  template: '<div>Mock Book Card</div>'
})
export class MockBookCardComponent {
  @Input() book: Book;
}
