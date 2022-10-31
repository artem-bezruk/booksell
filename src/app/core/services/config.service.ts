import {Injectable} from '@angular/core';
import {AppConfig} from '../model/appConfig';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _appConfig = new BehaviorSubject<AppConfig | null>(null);
  get appConfig() {
    return this._appConfig.asObservable();
  }
  setAppConfig(appConfig: AppConfig) {
    this._appConfig.next(appConfig);
  }
}
