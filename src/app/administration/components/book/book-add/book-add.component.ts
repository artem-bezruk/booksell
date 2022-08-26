import {Component, OnInit} from '@angular/core';
import {BookAdministrationService} from '../../../services/book-administration.service';
import {Observable} from 'rxjs';
import {CoreService} from '../../../../core/services/core.service';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  hasResult: boolean;
  isLoading: Observable<boolean>;
  constructor(private bookService: BookAdministrationService, private coreService: CoreService) { }
  ngOnInit() {
    this.bookService.searchResult.subscribe(next => this.hasResult = next !== null);
    this.isLoading = this.coreService.isLoading;
  }
}
