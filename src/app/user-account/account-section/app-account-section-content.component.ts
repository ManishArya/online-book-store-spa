import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppAccountSectionService } from './app-account-section.service';

@Component({
  selector: 'app-account-section-content',
  template: ''
})
export class AppAccountSectionContentComponent implements OnDestroy {
  public index: number = 0;
  private readonly _destory$ = new Subject<void>();

  constructor(protected accountSectionService: AppAccountSectionService) {}

  public ngOnDestroy(): void {
    this._destory$.next();
    this._destory$.complete();
  }

  protected listenToSectionIndexChanges(): void {
    this.accountSectionService.activeIndexChanges$
      .pipe(takeUntil(this._destory$))
      .subscribe((index) => (this.index = index));
  }
}
