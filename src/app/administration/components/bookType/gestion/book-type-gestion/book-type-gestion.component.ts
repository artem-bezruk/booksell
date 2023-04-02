import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {CoreService} from '../../../../../core/services/core.service';
@Component({
  selector: 'app-book-type-gestion',
  templateUrl: './book-type-gestion.component.html'
})
export class BookTypeGestionComponent implements OnInit {
  hasResult = false;
  isLoading: Observable<boolean> = this.coreService.isLoading;
  constructor(private bookTypeService: BookTypeAdministrationService, private coreService: CoreService) {
  }
  ngOnInit() {
    this.bookTypeService.list.subscribe(next => this.hasResult = next !== null);
    this.bookTypeService.getAll();
  }
}
