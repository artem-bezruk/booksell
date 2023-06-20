import {Component, Input, Output} from '@angular/core';
@Component({
  selector: 'app-series-display',
  template: '<div>Mock Series Display</div>'
})
export class MockSeriesDisplayComponent {
  @Input()
  series: string;
  @Input()
  seriesData: any;
  @Output()
  showBookDetails: any;
}
