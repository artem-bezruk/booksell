import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderImgComponent } from './loader-img.component';
describe('LoaderImgComponent', () => {
  let component: LoaderImgComponent;
  let fixture: ComponentFixture<LoaderImgComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderImgComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
