import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/guards/auth.guard';
import {BookLayoutComponent} from './layout/administration-layout/book-layout.component';
import {BookListComponent} from './components/book-list/book-list.component';
const booksRoutes: Routes = [
  {
    path: 'book', canActivate: [AuthGuard], component: BookLayoutComponent, children: [
      {path: 'list', component: BookListComponent}
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
