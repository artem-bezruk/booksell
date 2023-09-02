import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Series} from '../../../../core/model/series';
import {Editor} from '../../../../core/model/editor';
import {EditorImpl} from '../../../../core/model/impl/editor-impl';
import {map, startWith, tap} from 'rxjs/operators';
@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html'
})
export class EditorFormComponent implements OnInit {
  @Input()
  form: FormGroup;
  filteredOptions: Observable<Editor[]>;
  editors: Editor[] = [new EditorImpl('Urban Comics'), new EditorImpl('Panini'), new EditorImpl('Soleil')];
  constructor() {
  }
  ngOnInit(): void {
    this.filteredOptions = this.form.controls.name.valueChanges
      .pipe(
        startWith(this.getControlValue()),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => this._filter(value, this.editors))
      );
  }
  displayFn(value: Editor | string): string {
    return typeof value === 'string' ? value : (value && value.name ? value.name : '');
  }
  private getControlValue(): string {
    return this.form.controls.name.value;
  }
  private _filter(value: string, options: Editor[]): Editor[] {
    return options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }
  update(value: Editor): void {
    this.form.controls.name.setValue(value.name);
  }
}
