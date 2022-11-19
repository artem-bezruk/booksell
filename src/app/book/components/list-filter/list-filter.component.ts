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
  form: FormGroup = this.fb.group({
    globalTextCtrl: this.fb.control({value: '', disabled: true}),
    groupsCtrl: this.fb.control([]),
    seriesCtrl: this.fb.control([])
  });
  data: SeriesByGroupContainer = new Map();
  groups: string[] = [];
  groupByEditors: Observable<boolean>;
  constructor(private fb: FormBuilder, private bookListService: BookListService) {
    this.groupByEditors = this.bookListService.groupByEditors;
  }
  ngOnInit() {
    this.bookListService.searchResult.subscribe(data => {
      if (data !== null) {
        this.data = data;
        this.groups = Utils.orderStringList(Utils.getMapKeysAsArray(data), this.bookListService.order);
      }
    });
    this.form.valueChanges.subscribe(() => {
      const groupsCtrl = this.form.get('groupsCtrl');
      const seriesCtrl = this.form.get('seriesCtrl');
      if (groupsCtrl && seriesCtrl) {
        this.bookListService.filter({
          group: groupsCtrl.value,
          series: seriesCtrl.value
        });
      }
    });
  }
  displayGroup(group: string): boolean {
    const groupsCtrl = this.form.get('groupsCtrl');
    if (groupsCtrl) {
      const groupSelected: string[] = groupsCtrl.value;
      return groupSelected.length === 0 || groupSelected.includes(group);
    }
    return false;
  }
  clearFilters() {
    this.form.reset({
      groupsCtrl: [],
      seriesCtrl: []
    });
  }
  getSeries(data: SeriesByGroupContainer, groupName: string): string[] {
    const group = data.get(groupName);
    return group ? Utils.getMapKeysAsArray(group) : [];
  }
}
