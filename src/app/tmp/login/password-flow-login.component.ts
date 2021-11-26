import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/service/auth.service';
@Component({
  selector: 'app-password-flow-login',
  templateUrl: './password-flow-login.component.html'
})
export class PasswordFlowLoginComponent implements OnInit {
  userName = 'admin@bookshelf.com';
  password = 'changeme!';
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
  }
  loginWithPassword() {
    this.authService.obtainAccessToken('admin@bookshelf.com', 'changeme!');
  }
}
