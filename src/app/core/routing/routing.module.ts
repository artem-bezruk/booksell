import {NgModule} from '@angular/core';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import {RouterModule, Routes} from '@angular/router';
const appRoutes: Routes = [
  {path: '', component: ToolbarComponent, outlet: 'toolbar'},
  {path: 'book', redirectTo: '/book', pathMatch: 'full'},
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
