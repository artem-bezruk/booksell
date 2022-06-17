import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-series-list-filter',
  templateUrl: './series-list-filter.component.html',
  styleUrls: ['./series-list-filter.component.css']
})
export class SeriesListFilterComponent implements OnInit {
  @Output()
  private filter: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      filter: this.fb.control('')
    });
  }
  updateFilter($event): void {
    this.filter.emit($event);
  }
}