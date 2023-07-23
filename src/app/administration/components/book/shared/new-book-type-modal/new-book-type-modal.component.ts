import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-new-book-type-modal',
  templateUrl: './new-book-type-modal.component.html'
})
export class NewBookTypeModalComponent {
  public form = this.fb.group({
    bookType: this.fb.control({})
  });
  constructor(public dialogRef: MatDialogRef<NewBookTypeModalComponent>, private fb: FormBuilder) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
