import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material';
import {BookListService} from '../../services/book-list.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-book-list-action-bar',
  templateUrl: './book-list-action-bar.component.html',
  styleUrls: ['./book-list-action-bar.component.css']
})
export class BookListActionBarComponent implements OnInit {
  @Output()
  private filter: EventEmitter<void> = new EventEmitter();
  public isGroupedByEditors: Observable<boolean>;
  constructor(private bookListService: BookListService) {
  }
  ngOnInit() {
    this.isGroupedByEditors = this.bookListService.groupByEditors;
  }
  filterAction() {
    this.filter.emit();
  }
  changeSortOrderAction() {
    this.bookListService.changeSortOrder();
  }
  changeDisplayAction($event: MatSlideToggleChange) {
    this.bookListService.changeDisplay($event.checked);
  }
  isSortOrderAsc(): boolean {
    return this.bookListService.isSortOrderAsc();
  }
}
