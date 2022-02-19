import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {SeriesByEditorContainer} from '../../../core/model/seriesByEditorContainer';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  searchResult: Observable<SeriesByEditorContainer>;
  isLoading: Observable<boolean>;
  constructor(private bookService: BookService) {
  }
  ngOnInit() {
    this.bookService.getAllBook();
    this.searchResult = this.bookService.searchResult;
    this.isLoading = this.bookService.isLoading;
  }
}
