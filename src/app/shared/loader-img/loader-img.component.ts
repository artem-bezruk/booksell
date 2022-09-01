import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-loader-img',
  templateUrl: './loader-img.component.html',
  styleUrls: ['./loader-img.component.css']
})
export class LoaderImgComponent implements OnInit {
  @Input() img: {src: string, alt: string};
  @Input() imgContainerClass: string;
  public loading = true;
  onLoad() {
    this.loading = false;
  }
  constructor() { }
  ngOnInit() { }
}
