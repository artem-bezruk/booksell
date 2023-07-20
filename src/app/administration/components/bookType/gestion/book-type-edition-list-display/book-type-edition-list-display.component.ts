import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {BookType} from '../../../../../core/model/bookType';
import {HasTimedProgressBar} from '../../../../../shared/has-timed-progress-bar';
@Component({
  selector: 'app-book-type-edition-list-display',
  templateUrl: './book-type-edition-list-display.component.html'
})
export class BookTypeEditionListDisplayComponent extends HasTimedProgressBar implements OnInit {
  @Input()
  bookType: BookType = {nbBooks: 0, id: 0, name: ''};
  form: FormGroup = this.fb.group({
    name: this.fb.control(''),
  });
  constructor(private fb: FormBuilder,
              private bookTypeService: BookTypeAdministrationService) {
    super();
  }
  ngOnInit() {
    this.init();
  }
  initForm(): void {
    this.form.setValue({
      name: this.bookType.name
    });
  }
  submit() {
    this.progressBarState = {display: true, type: 'indeterminate'};
    const bookType = this.form.value;
    bookType.id = this.bookType.id;
    this.bookTypeService.update(bookType).subscribe(value => {
      this.bookType = value;
      this.bookTypeService.getAll();
      this.updateIsSaved();
      this.hideProgressBar();
    });
  }
  deleteBookType() {
    this.bookTypeService.delete(this.bookType);
    this.bookTypeService.getAll();
  }
  getNbBooks(): string {
    return (this.bookType.nbBooks || 0).toString();
  }
  bookTypeRemovable(): boolean {
    return this.bookType.nbBooks === 0;
  }
}
