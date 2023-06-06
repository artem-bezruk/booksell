import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
@Injectable()
export class TranslateServiceMock {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }
}
