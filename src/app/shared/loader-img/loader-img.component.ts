import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Image} from '../models/image';
@Component({
  selector: 'app-loader-img',
  templateUrl: './loader-img.component.html',
  styleUrls: ['./loader-img.component.scss']
})
export class LoaderImgComponent implements OnInit, OnChanges {
  @Input() img: Image | null = null;
  @Input() imgContainerClass: string | null = null;
  private defaultImg = {
    src: 'assets/images/no_cover.jpg',
    alt: 'No cover found'
  };
  public src: string;
  public alt: string;
  public loading = true;
  onLoad() {
    this.loading = false;
  }
  onError() {
    this.loading = false;
    this.loadImg(this.defaultImg);
  }
  constructor() {
  }
  ngOnInit() {
    this.loadImg(this.img !== null ? this.img : this.defaultImg);
  }
  loadImg(img: Image | null) {
    this.alt = img.alt;
    this.src = img.src;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadImg(this.img !== null ? this.img : this.defaultImg);
  }
}
