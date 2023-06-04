import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@ngx-translate/core';
const translateServiceMock = {
  addLangs: jest.fn((langs: string[]) => {
  }),
  setDefaultLang: jest.fn((lang: string) => {
  }),
  getBrowserLang: jest.fn(() => 'fr'),
  use: jest.fn((lang: string) => {
  }),
  get: jest.fn(() => 'fr')
};
describe('AppComponent', () => {
  let fixture;
  let component;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock}
      ]
    }).compileComponents();
  }));
  beforeEach((() => {
    jest.clearAllMocks();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));
  test('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('Default config should be loaded', () => {
    expect(translateServiceMock.setDefaultLang).toHaveBeenNthCalledWith(1, 'fr');
    expect(translateServiceMock.use).toHaveBeenNthCalledWith(1, 'fr');
  });
});
