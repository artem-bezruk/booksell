import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookFilter} from '../../../core/model/book-filter';
import {SeriesByGroupContainer} from '../../../core/model/series-by-group-container';
@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input()
  data: SeriesByGroupContainer;
  @Input()
  groups: string[] = [];
  @Input()
  groupByEditors: boolean;
  @Output()
  filter: EventEmitter<BookFilter> = new EventEmitter();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      globalTextCtrl: this.fb.control(''),
      groupsCtrl: this.fb.control([]),
      seriesCtrl: this.fb.control([])
    });
  }
  ngOnInit() {
  }
  displayGroup(group: string) {
    const groupSelected: string[] = this.form.get('groupsCtrl').value;
    return groupSelected.length === 0 || groupSelected.includes(group);
  }
  clearFilters() {
    this.form.reset({
      groupsCtrl: [],
      seriesCtrl: []
    });
  }
  ngOnChanges(): void {
    this.form.valueChanges.subscribe(val =>
      this.filter.emit({
        group: this.form.get('groupsCtrl').value,
        series: this.form.get('seriesCtrl').value
      })
    );
  }
}
