import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {
  MatChipsModule,
  MatExpansionModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule
} from '@angular/material';
import {CoreModule} from '../core/core.module';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookLayoutComponent} from './layout/book-layout/book-layout.component';
import {BookRoutingModule} from './book-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faBookOpen,
  faBookReader, faCaretDown, faCaretUp,
  faChevronRight,
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp
} from '@fortawesome/free-solid-svg-icons';
import {BookDisplayComponent} from './components/book-display/book-display.component';
import {SeriesDisplayComponent} from './components/series-display/series-display.component';
import {EditorDisplayComponent} from './components/editor-display/editor-display.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {ListFilterComponent} from './components/list-filter/list-filter.component';
import { BookListActionBarComponent } from './components/book-list-action-bar/book-list-action-bar.component';
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
    FontAwesomeModule,
    MatSelectModule,
    MatSidenavModule
  ],
  declarations: [BookLayoutComponent, BookListComponent, BookDisplayComponent, SeriesDisplayComponent, EditorDisplayComponent, BookDetailsComponent, ListFilterComponent, BookListActionBarComponent]
})
export class BookModule {
  constructor() {
    library.add(faBookOpen);
    library.add(faBookReader);
    library.add(faBook);
    library.add(faFilter);
    library.add(faSortAlphaUp);
    library.add(faSortAlphaDown);
    library.add(faChevronRight);
    library.add(faCaretUp);
    library.add(faCaretDown);
  }
}
