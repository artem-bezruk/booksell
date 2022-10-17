import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SeriesByGroupContainer} from '../../../core/model/series-by-group-container';
import {BookListService} from '../../services/book-list.service';
import {Utils} from '../../../shared/utils';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit {
  form: FormGroup;
  data: SeriesByGroupContainer;
  groups: string[];
  groupByEditors: Observable<boolean>;
  constructor(private fb: FormBuilder, private bookListService: BookListService) {
    this.groupByEditors = this.bookListService.groupByEditors;
    this.form = this.fb.group({
      globalTextCtrl: this.fb.control({value: '', disabled: true}),
      groupsCtrl: this.fb.control([]),
      seriesCtrl: this.fb.control([]),
      tagsCtrl: this.fb.control([])
    });
  }
  ngOnInit() {
    this.bookListService.searchResult.subscribe(data => {
      this.data = data;
      this.groups = Utils.orderStringList(Object.keys(data), this.bookListService.order);
    });
    this.form.valueChanges.subscribe(() =>
      this.bookListService.filter({
        group: this.form.get('groupsCtrl').value,
        series: this.form.get('seriesCtrl').value
      })
    );
  }
  displayGroup(group: string) {
    const groupSelected: string[] = this.form.get('groupsCtrl').value;
    return groupSelected.length === 0 || groupSelected.includes(group);
  }
  clearFilters() {
    this.form.reset({
      groupsCtrl: [],
      seriesCtrl: [],
      tagsCtrl: []
    });
  }
}
