import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
const appRoutes: Routes = [
  {path: '', component: HeaderComponent, outlet: 'header'},
  {path: '', component: FooterComponent, outlet: 'footer'},
  {path: '', redirectTo: '/book', pathMatch: 'full'},
  {path: 'administration', redirectTo: '/administration', pathMatch: 'full'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {
}
