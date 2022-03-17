import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookFilter} from '../../../core/model/book-filter';
import {SeriesByEditorContainer} from '../../../core/model/series-by-editor-container';
@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit {
  form: FormGroup;
  @Input()
  data: SeriesByEditorContainer;
  @Input()
  editors: string[];
  @Output()
  filter: EventEmitter<BookFilter> = new EventEmitter();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      globalTextCtrl: this.fb.control(''),
      editorsCtrl: this.fb.control([]),
      seriesCtrl: this.fb.control([])
    });
  }
  ngOnInit() {
  }
  submit() {
    this.filter.emit({
      editors: this.form.get('editorsCtrl').value,
      series: this.form.get('seriesCtrl').value
    });
  }
  displayGroup(editor: string) {
    const editorsSelected: string[] = this.form.get('editorsCtrl').value;
    return editorsSelected.length === 0 || editorsSelected.includes(editor);
  }
  clearFilters() {
    this.form.reset({
      editorsCtrl: [],
      seriesCtrl: []
    });
    this.submit();
  }
}
