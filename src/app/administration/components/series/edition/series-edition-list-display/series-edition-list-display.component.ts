import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Series} from '../../../../../core/model/series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {switchMap, takeWhile} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {SeriesAdministrationService} from '../../../../services/series-administration.service';
@Component({
  selector: 'app-series-edition-display',
  templateUrl: './series-edition-list-display.component.html',
})
export class SeriesEditionListDisplayComponent implements OnInit {
  private _isSaved: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isSaved(): Observable<boolean> {
    return this._isSaved;
  }
  constructor(private fb: FormBuilder, private seriesService: SeriesAdministrationService) {
  }
  @Input()
  series: Series = {seriesBookCount: 0, displayName: '', name: ''};
  form: FormGroup = this.fb.group({
    displayName: this.fb.control(''),
    seriesBookCount: this.fb.control('', Validators.min(1)),
  });
  private time = 3;
  private toogle = new BehaviorSubject(false);
  remainingSeconds = this.toogle.pipe(
    switchMap((running: boolean) => (running ? timer(0, 1000) : of(0))),
    takeWhile(t => t <= this.time),
  );
  progressBarState = {display: false, type: 'determinate'};
  public getProgressBarValue(val: number) {
    return (val / this.time) * 100;
  }
  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(() => {
      this.progressBarState = {display: true, type: 'determinate'};
      this.toogle.next(true);
    });
    this.remainingSeconds.subscribe((t: number) => {
      if (t === this.time) {
        this.submit();
      }
    });
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
      this._isSaved.next(true);
      setTimeout(() => this._isSaved.next(false), 3000);
      this.series = value;
      this.progressBarState.display = false;
    });
  }
}
