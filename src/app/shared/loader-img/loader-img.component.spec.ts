import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoaderImgComponent} from './loader-img.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
describe('LoaderImgComponent', () => {
  let component: LoaderImgComponent;
  let fixture: ComponentFixture<LoaderImgComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderImgComponent],
      imports: [
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Business test', () => {
    test('should set img pass at input at init', () => {
      const img = {
        src: 'myImg.jpg',
        alt: 'Cover found'
      };
      component.img = img;
      component.ngOnInit()
      expect(component.alt).toStrictEqual(img.alt);
      expect(component.src).toStrictEqual(img.src);
    });
    test('should set default img on changes', () => {
      component.ngOnChanges({})
      expect(component.alt).toStrictEqual(component[`defaultImg`].alt);
      expect(component.src).toStrictEqual(component[`defaultImg`].src);
    });
    test('should set img pass at input on changes', () => {
      const img = {
        src: 'myImg.jpg',
        alt: 'Cover found'
      };
      component.img = img;
      component.ngOnChanges({})
      expect(component.alt).toStrictEqual(img.alt);
      expect(component.src).toStrictEqual(img.src);
    });
    test('should set loading at false', () => {
      component.onLoad()
      expect(component.loading).toBeFalsy();
    });
    test('should set loading at false and load default image', () => {
      component.onError()
      expect(component.loading).toBeFalsy();
      expect(component.alt).toStrictEqual(component[`defaultImg`].alt);
      expect(component.src).toStrictEqual(component[`defaultImg`].src);
    });
  });
});
