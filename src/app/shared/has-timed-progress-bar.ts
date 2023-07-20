import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {switchMap, takeWhile} from 'rxjs/operators';
export abstract class HasTimedProgressBar {
  public form;
  private isSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isSaved(): Observable<boolean> {
    return this.isSaved$;
  }
  protected time = 3;
  protected toggle = new BehaviorSubject(false);
  public remainingSeconds = this.toggle.pipe(
    switchMap((running: boolean) => (running ? timer(0, 1000) : of(0))),
    takeWhile(t => t <= this.time),
  );
  public progressBarState = {display: false, type: 'determinate'};
  abstract submit()
  abstract initForm();
  public getProgressBarValue(val: number) {
    return (val / this.time) * 100;
  }
  init() {
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
  protected updateIsSaved() {
    this.isSaved$.next(true);
    setTimeout(() => this.isSaved$.next(false), 3000);
  }
  protected hideProgressBar() {
    this.progressBarState.display = false;
    this.toggle.next(false);
  }
}
