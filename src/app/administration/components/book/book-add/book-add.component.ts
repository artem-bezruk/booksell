import {Component, OnInit} from '@angular/core';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {Observable} from 'rxjs';
import {CoreService} from '../../../../core/services/core.service';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html'
})
export class BookAddComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private bookService: BookAdministrationService, private coreService: CoreService) { }
  ngOnInit() {
    this.bookService.searchResult.subscribe(next => this.hasResult = next !== null);
  }
}
