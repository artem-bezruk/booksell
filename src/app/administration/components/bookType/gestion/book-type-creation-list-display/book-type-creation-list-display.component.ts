import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
@Component({
  selector: 'app-book-type-creation-list-display',
  templateUrl: './book-type-creation-list-display.component.html'
})
export class BookTypeCreationListDisplayComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: this.fb.control(''),
  });
  constructor(private fb: FormBuilder,
              private bookTypeAdministrationService: BookTypeAdministrationService) {
  }
  ngOnInit(): void {
  }
  submit() {
    this.bookTypeAdministrationService.add(this.form.value);
    this.form.reset()
  }
}
