import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-series-edition-display',
  template: '<div>Mock Series Edition Display</div>',
})
export class MockSeriesEditionListDisplayComponent {
  @Input()
  series: any;
}
