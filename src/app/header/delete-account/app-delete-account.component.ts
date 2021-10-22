import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { LogOutService } from 'src/app/services/log-out.service';
import { AppDeleteAccountModalComponent } from './app-delete-account-modal.component';

@Component({
  selector: 'app-delete-account',
  templateUrl: './app-delete-account.component.html'
})
export class AppDeleteAccountComponent {
  constructor(private logOutService: LogOutService, private dialogService: MatDialog) {}

  public deleteAccount(): void {
    this.dialogService
      .open(AppDeleteAccountModalComponent, { width: '300px' })
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe((res) => {
        this.logOutService.signOut();
      });
  }
}
