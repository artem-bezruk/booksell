import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrationLayoutComponent} from './layout/administration-layout/administration-layout.component';
import {BookAddComponent} from './components/book/creation/book-add/book-add.component';
import {AuthGuard} from '../auth/guards/auth.guard';
import {SeriesEditionComponent} from './components/series/edition/series-edition/series-edition.component';
import {BookEditionComponent} from './components/book/edition/book-edition/book-edition.component';
const booksRoutes: Routes = [
  {
    path: 'administration', canActivate: [AuthGuard], component: AdministrationLayoutComponent, children: [
      {path: 'book/add', component: BookAddComponent},
      {path: 'book/edition', component: BookEditionComponent},
      {path: 'series/edition', component: SeriesEditionComponent}
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
export class AdministrationRoutingModule {
}
