import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrationLayoutComponent} from './layout/administration-layout/administration-layout.component';
import {BookAddComponent} from './components/book/book-add/book-add.component';
import {AuthGuard} from '../auth/guards/auth.guard';
const booksRoutes: Routes = [
  {
    path: 'administration', canActivate: [AuthGuard], component: AdministrationLayoutComponent, children: [
      {path: 'book/add', component: BookAddComponent}
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
