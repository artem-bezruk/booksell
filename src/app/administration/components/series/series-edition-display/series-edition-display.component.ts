import {Component, Input, OnInit} from '@angular/core';
import {Series} from '../../../../core/model/series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-series-edition-display',
  templateUrl: './series-edition-display.component.html',
  styleUrls:  ['../../../administration-edition.scss']
})
export class SeriesEditionDisplayComponent implements OnInit {
  @Input()
  series: Series = {seriesBookCount: 0};
  @Input()
  form: FormGroup = this.fb.group({
    name: this.fb.control(''),
    seriesBookCount: this.fb.control('', Validators.min(1)),
  });
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.initForm();
  }
  initForm(): void {
    this.form.setValue({
      name: this.series.name,
      seriesBookCount: this.series.seriesBookCount
    });
  }
  resetSeries(): void {
    this.initForm();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
  isUpdatable(): boolean {
    return this.form.valid && !this.form.pristine;
  }
}
