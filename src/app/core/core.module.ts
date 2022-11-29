import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatToolbarModule} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBan, faPencilAlt, faPlus, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    MatToolbarModule,
    MatMenuModule,
    FontAwesomeModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    SharedModule,
    TranslateModule,
    RoutingModule
  ]
})
export class CoreModule {
  constructor() {
    library.add(faPlus);
    library.add(faPencilAlt);
    library.add(faTrash);
    library.add(faSave);
    library.add(faBan);
  }
}
