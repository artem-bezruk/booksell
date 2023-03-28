import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../core/services/core.service';
import {AdministrationService} from './administration.service';
import {BookType} from '../../core/model/bookType';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class BookTypeAdministrationService extends AdministrationService<BookType> {
  constructor(http: HttpClient, coreService: CoreService,
              private translateService: TranslateService,
              private snackBar: MatSnackBar) {
    super(http, coreService, 'bookTypes');
  }
  filterFunction(bookType: BookType, filterStr: string): boolean {
    return true;
  }
  add(bookType: BookType): Observable<BookType> {
    this.coreService.updateLoadingState(true);
    const o = this.http.post<BookType>('/api/bookTypes/', bookType).pipe(shareReplay());
    o.subscribe(
      res => this.snackBar.open(this.translateService.instant('BOOK_TYPE.CREATION.MSG', {name: res.name})),
      err => console.error('an error occured!', err),
      () => {
        this.getAll();
        this.coreService.updateLoadingState(false);
      });
    return o;
  }
}
