import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Series} from '../../../../core/model/series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-series-edition-display',
  templateUrl: './series-edition-display.component.html',
  styleUrls: ['./series-edition-display.component.css']
})
export class SeriesEditionDisplayComponent implements OnInit {
  @Input()
  series: Series;
  @Output()
  updateSeries: EventEmitter<Series> = new EventEmitter<Series>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control(''),
      seriesBookCount: this.fb.control('', Validators.min(1)),
    });
    this.initForm();
  }
  submit(): void {
    const series = this.form.value;
    series.id = this.series.id;
    this.updateSeries.emit(series);
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
