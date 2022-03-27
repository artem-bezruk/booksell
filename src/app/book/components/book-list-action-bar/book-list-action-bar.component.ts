import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-book-list-action-bar',
  templateUrl: './book-list-action-bar.component.html',
  styleUrls: ['./book-list-action-bar.component.css']
})
export class BookListActionBarComponent implements OnInit {
  @Output()
  private filter: EventEmitter<void> = new EventEmitter();
  @Output()
  private changeSortOrder: EventEmitter<void> = new EventEmitter();
  @Input()
  isSortOrderAsc: boolean;
  constructor() { }
  ngOnInit() {
  }
  filterAction() {
    this.filter.emit();
  }
  changeSortOrderAction() {
    this.changeSortOrder.emit();
  }
}
