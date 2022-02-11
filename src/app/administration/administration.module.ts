import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdministrationLayoutComponent} from './layout/administration-layout/administration-layout.component';
import {BookAddComponent} from './components/book/book-add/book-add.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import { IsbnSearchComponent } from './components/book/isbn-search/isbn-search.component';
import { SearchResultComponent } from './components/book/search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    AdministrationRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  declarations: [AdministrationLayoutComponent, BookAddComponent, IsbnSearchComponent, SearchResultComponent]
})
export class AdministrationModule {
}
