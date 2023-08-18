import {Component, Input, OnInit} from '@angular/core';
import {Series} from '../../../../../core/model/series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
import {HasTimedProgressBar} from '../../../../../shared/has-timed-progress-bar';
import {SeriesImpl} from '../../../../../core/model/impl/series-impl';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-series-edition-display',
  templateUrl: './series-edition-list-display.component.html',
})
export class SeriesEditionListDisplayComponent extends HasTimedProgressBar implements OnInit {
  constructor(private fb: FormBuilder, private seriesService: SeriesAdministrationService, private translateService: TranslateService) {
    super();
  }
  @Input()
  set series(series: Series){
   this._series = SeriesImpl.fromSeries(series);
  }
  get series(): Series {
    return this._series;
  }
  private _series : SeriesImpl = new SeriesImpl();
  form: FormGroup = this.fb.group({
    displayName: this.fb.control(''),
    seriesBookCount: this.fb.control('', Validators.min(1)),
  });
  ngOnInit() {
    this.init();
  }
  initForm(): void {
    let displayName = this._series.displayName
    if (this._series.isOneShot()) {
      displayName = this.translateService.instant('SERIES.ONE_SHOT')
      this.form.disable();
    }
    this.form.setValue({
      displayName,
      seriesBookCount: this._series.seriesBookCount
    });
  }
  submit() {
    this.progressBarState = {display: true, type: 'indeterminate'};
    const series = {...this._series, ...this.form.value};
    this.seriesService.update(series).subscribe(value => {
      this.series = value;
      this.updateIsSaved();
      this.hideProgressBar();
    });
  }
}
