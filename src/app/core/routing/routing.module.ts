import {NgModule} from '@angular/core';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../../tmp/home/home.component';
import {PasswordFlowLoginComponent} from '../../tmp/login/password-flow-login.component';
const appRoutes: Routes = [
  {path: '', component: ToolbarComponent, outlet: 'toolbar'},
  {path: 'book', redirectTo: '/book', pathMatch: 'full'},
  {path: 'login', component: PasswordFlowLoginComponent},
  {path: '', component: HomeComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {
}
