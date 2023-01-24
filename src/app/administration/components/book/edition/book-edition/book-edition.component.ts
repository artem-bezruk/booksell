import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CoreService} from '../../../../../core/services/core.service';
import {BookAdministrationService} from '../../../../services/book-administration.service';
@Component({
  selector: 'app-book-edition',
  templateUrl: './book-edition.component.html'
})
export class BookEditionComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private bookAdministrationService: BookAdministrationService, private coreService: CoreService) { }
  ngOnInit() {
    this.bookAdministrationService.getAll();
    this.bookAdministrationService.list.subscribe(next => this.hasResult = next !== null);
  }
  onFilter($event: string) {
    this.bookAdministrationService.filter($event);
  }
}
