import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-group-display',
  template: '<div>Mock Group Display</div>',
})
export class MockGroupDisplayComponent {
  @Input() seriesContainer: any
  @Input() editor: any
}
