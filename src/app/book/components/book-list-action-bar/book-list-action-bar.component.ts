import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material';
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
  @Output()
  private changeDisplay: EventEmitter<boolean> = new EventEmitter();
  @Input()
  isSortOrderAsc: boolean;
  @Input()
  public groupByEditors: boolean;
  constructor() {
  }
  ngOnInit() {
    this.groupByEditors = true;
  }
  filterAction() {
    this.filter.emit();
  }
  changeSortOrderAction() {
    this.changeSortOrder.emit();
  }
  changeDisplayAction($event: MatSlideToggleChange) {
    this.changeDisplay.emit($event.checked);
  }
}
