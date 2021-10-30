import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatToolbarModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RoutingModule,
    SharedModule,
    MatToolbarModule,
    MatMenuModule
  ],
  declarations: [ToolbarComponent],
  exports: [
    RoutingModule
  ]
})
export class CoreModule {
}
