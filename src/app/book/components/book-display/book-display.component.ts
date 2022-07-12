import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from 'src/app/core/model/book';
import {AuthService} from '../../../auth/services/auth.service';
@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent implements OnInit {
  @Input()
  book: Book;
  @Output()
  showBookDetails: EventEmitter<void> = new EventEmitter<void>();
  constructor(private authService: AuthService) { }
  ngOnInit() {
  }
  openDetails() {
    this.showBookDetails.emit();
  }
  userConnected() {
    return this.authService.isAuthenticated;
  }
}
