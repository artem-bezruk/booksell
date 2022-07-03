import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material';
import {BookListService} from '../../services/book-list.service';
@Component({
  selector: 'app-book-list-action-bar',
  templateUrl: './book-list-action-bar.component.html',
  styleUrls: ['./book-list-action-bar.component.css']
})
export class BookListActionBarComponent implements OnInit {
  @Output()
  private filter: EventEmitter<void> = new EventEmitter();
  constructor(private bookListService: BookListService) {
  }
  ngOnInit() {
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
  isGroupedByEditors(): boolean {
    return this.bookListService.groupByEditors;
  }
}
