import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {BookTypeService} from '../../services/book-type.service';
import {BookType} from '../../model/bookType';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bookTypes: Observable<BookType[]> = this.bookTypeService.bookTypes;
  constructor(private authService: AuthService, private router: Router, private bookTypeService: BookTypeService) {
  }
  ngOnInit(): void {
    this.bookTypeService.getAllBookType();
  }
  userConnected() {
    return this.authService.currentUser;
  }
  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
