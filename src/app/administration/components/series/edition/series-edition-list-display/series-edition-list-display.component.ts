import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Series} from '../../../../../core/model/series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-series-edition-display',
  templateUrl: './series-edition-list-display.component.html',
})
export class SeriesEditionListDisplayComponent implements OnInit {
  @Input()
  series: Series = {seriesBookCount: 0};
  @Output()
  updateSeries: EventEmitter<Series> = new EventEmitter<Series>();
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
  submit(): void {
    const series = this.form.value;
    series.editor = this.series.editor;
    this.updateSeries.emit(series);
  }
}
