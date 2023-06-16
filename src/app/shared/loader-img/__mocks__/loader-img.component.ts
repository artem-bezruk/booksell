import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-loader-img',
  template: '<div>Mock Loader Img</div>'
})
export class MockLoaderImgComponent {
  @Input() img: any;
  @Input() imgContainerClass: any;
}
