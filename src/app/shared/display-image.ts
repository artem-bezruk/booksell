import {Image} from './models/image';
import {ImageImpl} from './models/impl/image-impl';
export class DisplayImage {
  constructor(private imgPath: string) {
  }
  getImg(cover: string): Image | null {
    return cover !== null ? new ImageImpl(`${this.imgPath}/${cover}`, cover) : null;
  }
}
