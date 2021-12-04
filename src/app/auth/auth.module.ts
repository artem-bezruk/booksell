import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInModalComponent} from './components/sign-in-modal/sign-in-modal.component';
import {CoreModule} from '../core/core.module';
@NgModule({
  declarations: [
    SignInModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    SignInModalComponent
  ],
  entryComponents: [
    SignInModalComponent
  ],
})
export class AuthModule {
}
