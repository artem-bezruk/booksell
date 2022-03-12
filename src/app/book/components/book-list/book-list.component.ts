import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeriesByEditorContainer} from '../../../core/model/seriesByEditorContainer';
import {BookFilter} from '../../../core/model/book-filter';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {Utils} from '../../../shared/utils';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  searchResult: SeriesByEditorContainer;
  isLoading: Observable<boolean>;
  constructor(private bookService: BookService) {
  }
  private _editors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get editors(): Observable<string[]> {
    return this._editors.asObservable();
  }
  private _filteredBooks: BehaviorSubject<SeriesByEditorContainer> = new BehaviorSubject<SeriesByEditorContainer>({});
  get filteredBooks(): Observable<SeriesByEditorContainer> {
    return this._filteredBooks.asObservable();
  }
  private _filteredEditors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get filteredEditors(): Observable<string[]> {
    return this._filteredEditors.asObservable();
  }
  ngOnInit() {
    this.bookService.getAllBook();
    this.bookService.searchResult.subscribe(res => {
      this.searchResult = res;
      this.updateFilteredBooks(res);
      if (res !== null) {
        this._editors.next(Utils.orderStringList(Object.keys(res)));
      }
    });
    this.isLoading = this.bookService.isLoading;
  }
  onFilter(filters: BookFilter) {
    const tmpEditor = Object.assign({}, this.searchResult);
    if (filters.editors.length > 0) {
      Object.keys(this.searchResult)
        .filter(editor => !filters.editors.includes(editor))
        .forEach(editor => delete tmpEditor[editor]);
    }
    if (filters.series.length > 0) {
      Object.keys(tmpEditor).forEach(editor => {
        const tmpSeries = Object.assign({}, tmpEditor[editor]);
        Object.keys(tmpSeries)
          .filter(series => !filters.series.includes(series))
          .forEach(series => delete tmpSeries[series]);
        if (Object.keys(tmpSeries).length === 0) {
          delete tmpEditor[editor];
        } else {
          tmpEditor[editor] = tmpSeries;
        }
      });
    }
    this.updateFilteredBooks(tmpEditor);
  }
  private updateFilteredBooks(seriesByEditorContainer: SeriesByEditorContainer) {
    if (seriesByEditorContainer !== null) {
      this._filteredBooks.next(seriesByEditorContainer);
      this._filteredEditors.next(Utils.orderStringList(Object.keys(seriesByEditorContainer)));
    }
  }
}
