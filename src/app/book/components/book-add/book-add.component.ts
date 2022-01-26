import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  hasResult: boolean;
  isLoading: Observable<boolean>;
  constructor(private bookService: BookService) { }
  ngOnInit() {
    this.bookService.searchResult.subscribe(next => this.hasResult = next !== null);
    this.isLoading = this.bookService.isLoading;
  }
}
