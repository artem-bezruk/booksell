import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {SeriesByEditorContainer} from '../../../core/model/seriesByEditorContainer';
import {BookFilter} from '../../../core/model/book-filter';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  searchResult: SeriesByEditorContainer;
  private _filteredData: BehaviorSubject<SeriesByEditorContainer> = new BehaviorSubject<SeriesByEditorContainer>({});
  get filteredData(): Observable<SeriesByEditorContainer> {
    return this._filteredData.asObservable();
  }
  isLoading: Observable<boolean>;
  constructor(private bookService: BookService) {
  }
  ngOnInit() {
    this.bookService.getAllBook();
    this.bookService.searchResult.subscribe(res => {
      this.searchResult = res;
      this._filteredData.next(res);
    });
    this.isLoading = this.bookService.isLoading;
  }
  onFilter(filters: BookFilter) {
    console.log(filters);
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
    this._filteredData.next(tmpEditor);
  }
}
