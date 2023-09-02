import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorFormComponent {
  @Input() form: FormGroup
  @Input() index: number
  @Output() deleteAuthor: EventEmitter<number> = new EventEmitter()
  roles = [];
  constructor() { }
  delete() {
    this.deleteAuthor.emit(this.index)
  }
}
