import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeriesByEditorContainer} from '../../../core/model/series-by-editor-container';
import {BookFilter} from '../../../core/model/book-filter';
import {Utils} from '../../../shared/utils';
import {SortOrder} from '../../../core/model/sort-order.enum';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  searchResult: SeriesByEditorContainer;
  isLoading: Observable<boolean>;
  private orderEditor: SortOrder = SortOrder.DESC;
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
        this._editors.next(Utils.orderStringList(Object.keys(res), this.orderEditor));
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
      this._filteredEditors.next(Utils.orderStringList(Object.keys(seriesByEditorContainer), this.orderEditor));
    }
  }
  changeSortOrder() {
    this.orderEditor = this.orderEditor === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this._filteredEditors.next(Utils.orderStringList(Object.keys(this._filteredBooks.value), this.orderEditor));
  }
  isSortOrderAsc = (): boolean => this.orderEditor === SortOrder.ASC;
}
