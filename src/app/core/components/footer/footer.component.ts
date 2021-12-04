import {Component, OnInit} from '@angular/core';
import {SignInModalComponent} from '../../../auth/components/sign-in-modal/sign-in-modal.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../../auth/service/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService) {
  }
  ngOnInit() {
  }
  openSignInModal() {
    const dialogRef = this.dialog.open(SignInModalComponent);
    dialogRef.afterClosed().subscribe();
  }
  userConnected() {
    return this.authService.isAuthenticated();
  }
}
