import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookLayoutComponent} from './layout/book-layout/book-layout.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookDashboardComponent} from './components/book-dashboard/book-dashboard.component';
const booksRoutes: Routes = [
  {
    path: 'book', component: BookLayoutComponent, children: [
      {path: '', component: BookDashboardComponent},
      {path: ':bookType', component: BookListComponent}
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
