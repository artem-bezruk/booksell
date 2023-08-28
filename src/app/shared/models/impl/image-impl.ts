import {Image} from '../image';
export class ImageImpl implements Image {
  constructor(public src: string, public alt: string) {
  }
}
