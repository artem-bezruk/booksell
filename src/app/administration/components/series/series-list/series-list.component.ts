import {Component, OnInit} from '@angular/core';
import {SeriesAdministrationService} from '../../../services/series-administration.service';
import {Observable} from 'rxjs';
import {Series} from '../../../../core/model/series';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html'
})
export class SeriesListComponent implements OnInit {
  seriesList: Observable<Series[]> = this.seriesService.seriesListFiltered;
  form = this.fb.group({
    series: this.fb.array([])
  });
  constructor(private seriesService: SeriesAdministrationService, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.seriesList.subscribe(seriesList => {
      this.getSeriesArray().clear();
      seriesList.forEach(() => this.getSeriesArray().push(this.fb.group({
        name: this.fb.control(''),
        seriesBookCount: this.fb.control('', Validators.min(1)),
      })));
    });
  }
  getSeriesArray(): FormArray {
    return (this.form.get('series') as FormArray);
  }
  submit() {
    this.seriesService.updateSeries({seriesBookCount: 0});
  }
}
