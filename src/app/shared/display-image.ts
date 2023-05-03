export class DisplayImage {
  constructor(private imgPath: string) {
  }
  getImg(cover: string) {
    return cover !== null ? {src: this.imgPath + '/' + cover, alt: cover} : null;
  }
}
