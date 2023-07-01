import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
@Injectable()
export class TranslateServiceMock {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }
  public setDefaultLang(lang: string) {
    console.log('setDefaultLang: ', lang)
  }
  public use(lang: string) {
    console.log('use: ', lang)
  }
}
