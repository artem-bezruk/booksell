import {ImageImpl} from './image-impl';
describe('ImageImpl', () => {
  it('should create an instance', () => {
    expect(new ImageImpl('src', 'alt')).toBeTruthy();
  });
});
