import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookLayoutComponent} from './layout/book-layout/book-layout.component';
import {BookAddComponent} from './components/book-add/book-add.component';
const booksRoutes: Routes = [
  {
    path: 'book', component: BookLayoutComponent, children: [
      {path: 'add', component: BookAddComponent}
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(booksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookRoutingModule {
}
