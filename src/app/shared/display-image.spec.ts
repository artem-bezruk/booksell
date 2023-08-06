import {DisplayImage} from './display-image';
describe('DisplayImage', () => {
  describe('Init test', () => {
    test('should create', () => {
      expect(new DisplayImage('toto')).toBeTruthy();
    });
  });
  describe('Business test', () => {
    test('should create an correct image', () => {
      const url = 'test'
      const displayImage = new DisplayImage(url)
      expect(displayImage.getImg('toto')).toStrictEqual({
        src: `${url}/toto`, alt: 'toto'
      })
    });
    test('should create a null image', () => {
      const url = 'test'
      const displayImage = new DisplayImage(url)
      expect(displayImage.getImg(null)).toBeNull()
    });
  });
});
