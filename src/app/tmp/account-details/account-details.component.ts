import {Component} from '@angular/core';
import {AuthService} from '../../auth/service/auth.service';
import {Account} from '../model/account';
@Component({
  selector: 'app-account-details',
  styleUrls: ['./account-details.component.css'],
  template: `<h1>Foo Details</h1>
  <label>ID</label> <span>{{account.id}}</span>
  <label>Name</label> <span>{{account.name}}</span>
  <button (click)="getFoo()" type="submit">New Foo</button>`
})
export class AccountDetailsComponent {
  public account: Account = new Account(1, 'sample account');
  private accountsUrl = 'http:
  constructor(private authService: AuthService) {
  }
}
