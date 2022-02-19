import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {MatChipsModule, MatExpansionModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookLayoutComponent} from './layout/administration-layout/book-layout.component';
import {BookRoutingModule} from './book-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faBook, faBookOpen, faBookReader, faCoffee} from '@fortawesome/free-solid-svg-icons';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    BookRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatChipsModule,
    FontAwesomeModule
  ],
  declarations: [BookLayoutComponent, BookListComponent]
})
export class BookModule {
  constructor() {
    library.add(faBookOpen);
    library.add(faBookReader);
    library.add(faBook);
  }
}
