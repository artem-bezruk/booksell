import {Component, OnInit} from '@angular/core';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {DisplayImage} from '../../../../shared/display-image';
import {Observable} from 'rxjs';
import {BookSearch} from '../../../models/book-search';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent extends DisplayImage implements OnInit {
  constructor(private bookAdministrationService: BookAdministrationService,
              private translateService: TranslateService
  ) {
    super('/files/search/covers');
  }
  public book$: Observable<BookSearch | null>;
  editorControl = new FormControl();
  editors: string[] = ['Urban Comics', 'Panini'];
  filteredEditor: Observable<string[]>;
  seriesControl = new FormControl();
  series: string[] = ['Watchmen', 'Lanfeust'];
  filteredSeries: Observable<string[]>;
  roles = ['scénario', 'dessins', 'couleurs'];
  ngOnInit(): void {
    this.book$ = this.bookAdministrationService.searchResult;
    this.bookAdministrationService.searchResult.subscribe(b => {
      this.editorControl.patchValue(b.editor);
      this.filteredEditor = this.editorControl.valueChanges
        .pipe(
          startWith(b.editor),
          map(value => this._filter(value, this.editors))
        );
      this.seriesControl.patchValue(b.series);
      this.filteredSeries = this.seriesControl.valueChanges
        .pipe(
          startWith(b.series),
          map(value => this._filter(value, this.series))
        );
    });
  }
  isBookOneShot(bookSearch: BookSearch): boolean {
    return bookSearch.series === null || bookSearch.series === '';
  }
  private _filter(value: string, source: string[]): string[] {
    return source.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }
}
