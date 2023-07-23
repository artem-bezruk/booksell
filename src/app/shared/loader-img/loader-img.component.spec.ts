import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoaderImgComponent} from './loader-img.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
describe('LoaderImgComponent', () => {
  let component: LoaderImgComponent;
  let fixture: ComponentFixture<LoaderImgComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderImgComponent ],
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
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
