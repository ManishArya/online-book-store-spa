import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { DialogService } from '../shared/app-confirmation-dialog/dialog.service';
import { LogOutService } from './log-out.service';

@Injectable()
export class IdleWatcherService implements OnDestroy {
  private timeoutId: NodeJS.Timeout;
  private keepAlive: boolean;

  constructor(private logoutService: LogOutService, private dialog: DialogService) {}

  public ngOnDestroy(): void {
    this.keepAlive = false;
  }

  public startWatcher(): void {
    this.keepAlive = true;
    fromEvent(document, 'visibilitychange')
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(() => {
        const idleTimeout = 2000 * 60;
        const userNotifyTimeout = 1000 * 60;
        let isUserNotify = false;

        if (document.visibilityState === 'hidden') {
          let timeout = userNotifyTimeout;
          let count = 0;
          this.timeoutId = setInterval(() => {
            if (count === 0) {
              isUserNotify = true;
              timeout = idleTimeout - userNotifyTimeout;
              count++;
              this.openConfirmDialog();
            } else {
              this.signout();
            }
          }, timeout);
        } else if (document.visibilityState === 'visible' && !isUserNotify) {
          clearInterval(this.timeoutId);
        }
      });
  }

  private openConfirmDialog(): void {
    const x = this.dialog
      .openConfirmationDialog({ header: 'InActive', body: '' })
      .beforeClosed()
      .subscribe((isClose) => {
        if (isClose) {
          this.signout();
        } else {
          clearInterval(this.timeoutId);
        }
      });
  }

  private signout(): void {
    this.keepAlive = false;
    clearInterval(this.timeoutId);
    this.logoutService.signOut(
      'To protect your data you were automatically signed out. Sign in again to keep working.'
    );
  }
}
