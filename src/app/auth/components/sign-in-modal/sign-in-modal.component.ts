import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
})
export class SignInModalComponent implements OnInit {
  form: FormGroup;
  error: string;
  constructor(public snackBar: MatSnackBar,
              private fb: FormBuilder,
              private authService: AuthService,
              public dialogRef: MatDialogRef<SignInModalComponent, boolean>,
              private translateService: TranslateService) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }
  @HostListener('keydown.esc')
  public onEsc(): void {
    this.cancel();
  }
  signIn() {
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    this.authService.obtainAccessToken(email, password).subscribe(
      () => {
        this.dialogRef.close(true);
      }, err => {
        let message;
        if (err.status === 400) {
          message = this.translateService.instant('SIGN_IN.ERRORS.BAD_REQUEST'  );
        } else {
          message = this.translateService.instant('ERRORS.GENERIC');
        }
        this.openSnackbar(message);
      });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  hasFormatError(control: string) {
    return this.form.controls[control].hasError('email') && !this.hasRequiredError(control);
  }
  hasRequiredError(control: string) {
    return this.form.controls[control].hasError('required');
  }
  private openSnackbar(message: string) {
    this.snackBar.open(message, this.translateService.instant('SNACKBAR.ACTION.CLOSE'));
  }
}
