import {FormControl} from '@angular/forms';
import {Series} from '../../../core/model/series';
export class SeriesForm {
  name = new FormControl();
  constructor(
    series: Series = null
  ) {
    if (series.name) {
      this.name.setValue(series.name);
    }
  }
}
