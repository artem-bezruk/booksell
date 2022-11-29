import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-series-list-filter',
  templateUrl: './series-list-filter.component.html'
})
export class SeriesListFilterComponent implements OnInit {
  @Output()
  private filter: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup = this.fb.group({
    filter: this.fb.control('')
  });
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
  }
  updateFilter($event: string): void {
    this.filter.emit($event);
  }
}
