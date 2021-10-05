import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  public formAddBook: FormGroup;
  public isbnCtrl: FormControl;
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.isbnCtrl = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?:[\d]{10}|[\d]{13})$/)]);
    this.formAddBook = this.fb.group({
      isbnCtrl: this.isbnCtrl
    });
  }
  onSubmit() {
    this.openSnackBar(this.isbnCtrl.value);
  }
  openSnackBar(isbn: string) {
    this.snackBar.open('You\'ve just added the book [' + isbn + '] to your library', 'close',{
      panelClass: 'accent'
    });
  }
}
