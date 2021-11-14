import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/service/auth.service';
@Component({
  selector: 'app-home',
  template: `<span>Welcome !!</span>
  <a (click)="logout()" href="#">Logout</a>
  <app-account-details></app-account-details>`
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.checkCredentials();
  }
  logout() {
    this.authService.logout();
  }
}
