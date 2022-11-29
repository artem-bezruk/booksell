import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-loader-img',
  templateUrl: './loader-img.component.html'
})
export class LoaderImgComponent implements OnInit {
  @Input() img: {src: string, alt: string} | null = null;
  @Input() imgContainerClass: string | null = null;
  public loading = true;
  onLoad() {
    this.loading = false;
  }
  constructor() { }
  ngOnInit() { }
}
