import {FormControl, Validators} from '@angular/forms';
import {Author} from '../../../core/model/author';
export class AuthorForm {
  name = new FormControl('', Validators.required)
  constructor(author: Author) {
    this.name.setValue(author.name)
  }
}
