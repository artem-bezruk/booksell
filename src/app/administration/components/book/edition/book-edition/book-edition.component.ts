import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CoreService} from '../../../../../core/services/core.service';
import {BookAdministrationService} from '../../../../services/book-administration.service';
import {NewBookTypeModalComponent} from '../../shared/new-book-type-modal/new-book-type-modal.component';
import {BookTypeService} from '../../../../../core/services/book-type.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {BookType} from '../../../../../core/model/bookType';
@Component({
  selector: 'app-book-edition',
  templateUrl: './book-edition.component.html'
})
export class BookEditionComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private bookAdministrationService: BookAdministrationService,
              private translateService: TranslateService,
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
          this.bookTypeService.createBookType(result).subscribe((value: BookType) =>
            this.snackBar.open(this.translateService.instant('BOOK_TYPE.CREATION.MSG', {name: value.name})));
        }
      });
  }
}
