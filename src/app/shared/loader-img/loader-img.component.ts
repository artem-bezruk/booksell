import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-loader-img',
  templateUrl: './loader-img.component.html',
  styleUrls: ['./loader-img.component.scss']
})
export class LoaderImgComponent implements OnInit {
  @Input() img: { src: string, alt: string } | null = null;
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
  loadImg(img: { src: string, alt: string } | null) {
    this.alt = img.alt;
    this.src = img.src;
  }
}
