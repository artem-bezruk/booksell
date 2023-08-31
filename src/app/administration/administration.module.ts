import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdministrationLayoutComponent} from './layout/administration-layout/administration-layout.component';
import {BookAddComponent} from './components/book/creation/book-add/book-add.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import {IsbnSearchComponent} from './components/book/creation/isbn-search/isbn-search.component';
import {SearchResultComponent} from './components/book/creation/search-result/search-result.component';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {CoreModule} from '../core/core.module';
import {SeriesEditionComponent} from './components/series/edition/series-edition/series-edition.component';
import {SeriesListFilterComponent} from './components/series/edition/series-list-filter/series-list-filter.component';
import {SeriesEditionListComponent} from './components/series/edition/series-edition-list/series-edition-list.component';
import {SeriesEditionListDisplayComponent} from './components/series/edition/series-edition-list-display/series-edition-list-display.component';
import {NewBookTypeModalComponent} from './components/book/shared/new-book-type-modal/new-book-type-modal.component';
import {BookEditionComponent} from './components/book/edition/book-edition/book-edition.component';
import {BookEditionListComponent} from './components/book/edition/book-edition-list/book-edition-list.component';
import {BookEditionListDisplayComponent} from './components/book/edition/book-edition-list-display/book-edition-list-display.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BookListFilterComponent} from './components/book/book-list-filter/book-list-filter.component';
import {BookTypeGestionComponent} from './components/bookType/gestion/book-type-gestion/book-type-gestion.component';
import {BookTypeGestionListComponent} from './components/bookType/gestion/book-type-gestion-list/book-type-gestion-list.component';
import {BookTypeCreationListDisplayComponent} from './components/bookType/gestion/book-type-creation-list-display/book-type-creation-list-display.component';
import {BookTypeEditionListDisplayComponent} from './components/bookType/gestion/book-type-edition-list-display/book-type-edition-list-display.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
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
    MatAutocompleteModule,
    FontAwesomeModule,
    MatSlideToggleModule
  ],
  declarations: [
    AdministrationLayoutComponent,
    BookAddComponent,
    IsbnSearchComponent,
    SearchResultComponent,
    SeriesEditionComponent,
    SeriesListFilterComponent,
    SeriesEditionListComponent,
    SeriesEditionListDisplayComponent,
    NewBookTypeModalComponent,
    BookListFilterComponent,
    BookEditionComponent,
    BookEditionListComponent,
    BookEditionListDisplayComponent,
    BookListFilterComponent,
    BookTypeGestionComponent,
    BookTypeGestionListComponent,
    BookTypeEditionListDisplayComponent,
    BookTypeCreationListDisplayComponent
    BookFormComponent
  ],
  entryComponents: [NewBookTypeModalComponent]
})
export class AdministrationModule {
}
