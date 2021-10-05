import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { BookLayoutComponent } from './layout/book-layout/book-layout.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import {BookRoutingModule} from './book-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule
  ],
  declarations: [BookLayoutComponent, BookAddComponent]
})
export class BookModule { }
