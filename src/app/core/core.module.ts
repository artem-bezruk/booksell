import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBan, faCheck, faPencilAlt, faPlus, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
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
  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus);
    library.addIcons(faPencilAlt);
    library.addIcons(faTrash);
    library.addIcons(faCheck);
    library.addIcons(faSave);
    library.addIcons(faBan);
  }
}
