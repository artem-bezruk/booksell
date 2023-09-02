import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {Series} from '../../../../core/model/series';
import {SeriesImpl} from '../../../../core/model/impl/series-impl';
@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html'
})
export class SeriesFormComponent implements OnInit {
  @Input()
  public form: FormGroup;
  filteredOptions: Observable<Series[]>;
  series: Series[] = [new SeriesImpl('Batman Eternal', null, 'toto'), new SeriesImpl('Lanfeust de Troy')];
  display = false;
  constructor() {
  }
  ngOnInit(): void {
    this.filteredOptions = this.form.controls.name.valueChanges
      .pipe(
        tap(value => this.form.controls.displayName.setValue(value)),
        startWith(this.getControlValue()),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => this._filter(value, this.series))
      );
  }
  displayFn(value: Series | string): string {
    return typeof value === 'string' ? value : (value && value.name ? value.name : '');
  }
  private getControlValue(): string {
    return this.form.controls.name.value;
  }
  private _filter(value: string, options: Series[]): Series[] {
    return options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }
  update(series: Series): void {
    this.form.controls.name.setValue(series.name);
    this.form.controls.displayName.setValue(series.displayName);
  }
  public toggleMore(): void {
    this.display = !this.display;
  }
  getIconName() {
    return this.display ? 'caret-up' : 'caret-down';
  }
}
