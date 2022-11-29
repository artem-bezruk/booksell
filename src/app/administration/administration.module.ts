import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdministrationLayoutComponent} from './layout/administration-layout/administration-layout.component';
import {BookAddComponent} from './components/book/book-add/book-add.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import {IsbnSearchComponent} from './components/book/isbn-search/isbn-search.component';
import {SearchResultComponent} from './components/book/search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule, MatExpansionModule, MatListModule, MatProgressBarModule, MatSelectModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
import {SeriesEditionComponent} from './components/series/series-edition/series-edition.component';
import {SeriesListFilterComponent} from './components/series/series-list-filter/series-list-filter.component';
import {SeriesListComponent} from './components/series/series-list/series-list.component';
import {SeriesEditionDisplayComponent} from './components/series/series-edition-display/series-edition-display.component';
import { NewBookTypeModalComponent } from './components/book/new-book-type-modal/new-book-type-modal.component';
import { BookEditionComponent } from './components/book/book-edition/book-edition.component';
import { BookEditionListComponent } from './components/book/book-edition-list/book-edition-list.component';
import { BookEditionListDisplayComponent } from './components/book/book-edition-list-display/book-edition-list-display.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    AdministrationRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    FontAwesomeModule
  ],
  declarations: [AdministrationLayoutComponent, BookAddComponent, IsbnSearchComponent, SearchResultComponent, SeriesEditionComponent,
    SeriesListFilterComponent, SeriesListComponent, SeriesEditionDisplayComponent, NewBookTypeModalComponent, BookEditionComponent, BookEditionListComponent, BookEditionListDisplayComponent],
  entryComponents: [NewBookTypeModalComponent]
})
export class AdministrationModule {
}
