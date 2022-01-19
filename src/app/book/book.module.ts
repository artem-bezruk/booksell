import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {BookLayoutComponent} from './layout/book-layout/book-layout.component';
import {BookAddComponent} from './components/book-add/book-add.component';
import {BookRoutingModule} from './book-routing.module';
import { IsbnSearchComponent } from './components/isbn-search/isbn-search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule, MatListModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    BookRoutingModule,
    MatListModule,
    MatExpansionModule
  ],
  declarations: [BookLayoutComponent, BookAddComponent, IsbnSearchComponent, SearchResultComponent]
})
export class BookModule {
}
