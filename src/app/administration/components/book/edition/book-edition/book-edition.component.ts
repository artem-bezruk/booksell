import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CoreService} from '../../../../../core/services/core.service';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {NewBookTypeModalComponent} from '../../shared/new-book-type-modal/new-book-type-modal.component';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-book-edition',
  templateUrl: './book-edition.component.html'
})
export class BookEditionComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private bookAdministrationService: BookAdministrationService,
              private coreService: CoreService,
              private bookTypeService: BookTypeService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }
  ngOnInit() {
    this.bookAdministrationService.getAll();
    this.bookAdministrationService.list.subscribe(next => this.hasResult = next !== null);
  }
  onFilter($event: string) {
    this.bookAdministrationService.filter($event);
  }
  createNewBookType() {
    this.dialog
      .open<NewBookTypeModalComponent, string>(NewBookTypeModalComponent, {width: '400px'})
      .afterClosed()
      .subscribe((result: string) => {
        if (result) {
          this.bookTypeService.createBookType(result).subscribe((value) =>
            this.snackBar.open(`new book type "${value.name}" created`));
        }
      });
  }
}
