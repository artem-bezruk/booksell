import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule, MatListModule, MatProgressBarModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookLayoutComponent} from './layout/administration-layout/book-layout.component';
import {BookRoutingModule} from './book-routing.module';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    BookRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  declarations: [BookLayoutComponent, BookListComponent]
})
export class AdministrationModule {
}
