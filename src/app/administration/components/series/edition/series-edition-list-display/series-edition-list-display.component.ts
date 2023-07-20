import {Component, Input, OnInit} from '@angular/core';
import {Series} from '../../../../../core/model/series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {HasTimedProgressBar} from '../../../../../shared/has-timed-progress-bar';
@Component({
  selector: 'app-series-edition-display',
  templateUrl: './series-edition-list-display.component.html',
})
export class SeriesEditionListDisplayComponent extends HasTimedProgressBar implements OnInit {
  constructor(private fb: FormBuilder, private seriesService: SeriesAdministrationService) {
    super();
  }
  @Input()
  series: Series = {seriesBookCount: 0, displayName: '', name: ''};
  form: FormGroup = this.fb.group({
    displayName: this.fb.control(''),
    seriesBookCount: this.fb.control('', Validators.min(1)),
  });
  ngOnInit() {
    this.init();
  }
  initForm(): void {
    this.form.setValue({
      displayName: this.series.displayName,
      seriesBookCount: this.series.seriesBookCount
    });
  }
  submit() {
    this.progressBarState = {display: true, type: 'indeterminate'};
    const series = this.form.value;
    series.editor = this.series.editor;
    series.name = this.series.name;
    series.id = this.series.id;
    this.seriesService.update(series).subscribe(value => {
      this.series = value;
      this.updateIsSaved();
      this.hideProgressBar();
    });
  }
}
