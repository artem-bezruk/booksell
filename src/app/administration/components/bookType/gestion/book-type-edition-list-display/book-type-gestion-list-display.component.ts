import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookTypeAdministrationService} from '../../../../services/book-type-administration.service';
import {BookType} from '../../../../../core/model/bookType';
import {switchMap, takeWhile} from 'rxjs/operators';
@Component({
  selector: 'app-book-type-edition-list-display',
  templateUrl: './book-type-gestion-list-display.component.html'
})
export class BookTypeGestionListDisplayComponent implements OnInit {
  private _isSaved: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isSaved(): Observable<boolean> {
    return this._isSaved;
  }
  constructor(private fb: FormBuilder,
              private bookTypeService: BookTypeAdministrationService) {
  }
  @Input()
  bookType: BookType = {nbBooks: 0, id: 0, name: ''};
  form: FormGroup = this.fb.group({
    name: this.fb.control(''),
  });
  private time = 3;
  private toggle = new BehaviorSubject(false);
  remainingSeconds = this.toggle.pipe(
    switchMap((running: boolean) => (running ? timer(0, 1000) : of(0))),
    takeWhile(t => t <= this.time),
  );
  progressBarState = {display: false, type: 'determinate'};
  public getProgressBarValue(val: number) {
    return (val / this.time) * 100;
  }
  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(() => {
      this.progressBarState = {display: true, type: 'determinate'};
      this.toggle.next(true);
    });
    this.remainingSeconds.subscribe((t: number) => {
      if (t === this.time) {
        this.submit();
      }
    });
  }
  initForm(): void {
    this.form.setValue({
      name: this.bookType.name
    });
  }
  submit() {
    this.progressBarState = {display: true, type: 'indeterminate'};
    const bookType = this.form.value;
    bookType.id = this.bookType.id;
    this.bookTypeService.update(bookType).subscribe(value => {
      this._isSaved.next(true);
      setTimeout(() => this._isSaved.next(false), 3000);
      this.bookType = value;
      this.progressBarState.display = false;
      this.toggle.next(false);
      this.bookTypeService.getAll();
    });
  }
  deleteBookType() {
    this.bookTypeService.delete(this.bookType);
    this.bookTypeService.getAll();
  }
  getNbBooks(): string {
    return (this.bookType.nbBooks || 0).toString()
  }
  bookTypeRemovable(): boolean {
    return this.bookType.nbBooks === 0;
  }
}
