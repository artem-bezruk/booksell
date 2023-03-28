import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CoreService} from '../../../../../core/services/core.service';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {NewBookTypeModalComponent} from '../../shared/new-book-type-modal/new-book-type-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
@Component({
  selector: 'app-book-edition',
  templateUrl: './book-edition.component.html'
})
export class BookEditionComponent implements OnInit {
  hasResult = false;
  constructor(private bookService: BookAdministrationService,
              private bookTypeService: BookTypeAdministrationService,
              private translateService: TranslateService,
              private coreService: CoreService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }
  isLoading: Observable<boolean> = this.coreService.isLoading;
  ngOnInit() {
    this.bookService.getAll();
    this.bookService.list.subscribe(next => this.hasResult = next !== null);
  }
  onFilter($event: string) {
    this.bookService.filter($event);
  }
  createNewBookType() {
    this.dialog
      .open<NewBookTypeModalComponent, string>(NewBookTypeModalComponent, {width: '400px'})
      .afterClosed()
      .subscribe((result: string) => {
        if (result) {
          this.bookTypeService.add({name: result});
        }
      });
  }
}
