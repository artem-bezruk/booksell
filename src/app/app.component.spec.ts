import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxTranslateTestingModule} from '../../__mocks__/@ngx-translate/core/ngx-translate-testing.module';
import {TranslateService} from '@ngx-translate/core';
describe('AppComponent', () => {
  let fixture;
  let component;
  let translateService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        NgxTranslateTestingModule
      ]
    }).compileComponents();
  }));
  beforeEach((() => {
    jest.clearAllMocks();
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));
  test('should create the app', () => {
    expect(component).toBeTruthy();
  });
  test('Default config should be loaded', () => {
    expect(translateService.setDefaultLang).toHaveBeenNthCalledWith(1, 'fr');
    expect(translateService.use).toHaveBeenNthCalledWith(1, 'fr');
  });
});
