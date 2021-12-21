import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
  }
  userConnected() {
    return this.authService.isAuthenticated();
  }
  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
