import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AdministrationLayoutComponent} from './administration-layout.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
describe('AdministrationLayoutComponent', () => {
  let component: AdministrationLayoutComponent;
  let fixture: ComponentFixture<AdministrationLayoutComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ AdministrationLayoutComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
