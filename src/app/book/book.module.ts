import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CoreModule} from '../core/core.module';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookLayoutComponent} from './layout/book-layout/book-layout.component';
import {BookRoutingModule} from './book-routing.module';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faBookOpen,
  faBookReader,
  faCaretDown,
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp
} from '@fortawesome/free-solid-svg-icons';
import {SeriesDisplayComponent} from './components/series-display/series-display.component';
import {GroupDisplayComponent} from './components/group-display/group-display.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {ListFilterComponent} from './components/list-filter/list-filter.component';
import {BookListActionBarComponent} from './components/book-list-action-bar/book-list-action-bar.component';
import {AlphabeticalSeriesDisplayComponent} from './components/alphabetical-series-display/alphabetical-series-display.component';
import {BookDashboardComponent} from './components/book-dashboard/book-dashboard.component';
import {BarChartModule, NumberCardModule, PieChartModule} from '@swimlane/ngx-charts';
import {BookCardComponent} from './components/book-card/book-card.component';
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
    MatSidenavModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    PieChartModule,
    BarChartModule,
    NumberCardModule
  ],
  declarations: [
    BookLayoutComponent,
    BookListComponent,
    SeriesDisplayComponent,
    GroupDisplayComponent,
    BookDetailsComponent,
    ListFilterComponent,
    BookListActionBarComponent,
    AlphabeticalSeriesDisplayComponent,
    BookDashboardComponent,
    BookCardComponent]
})
export class BookModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBookOpen);
    library.addIcons(faBookReader);
    library.addIcons(faBook);
    library.addIcons(faFilter);
    library.addIcons(faSortAlphaUp);
    library.addIcons(faSortAlphaDown);
    library.addIcons(faChevronRight);
    library.addIcons(faChevronLeft);
    library.addIcons(faCaretUp);
    library.addIcons(faCaretDown);
  }
}
