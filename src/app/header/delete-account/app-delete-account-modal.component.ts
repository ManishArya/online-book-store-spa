import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { StatusCode } from 'src/app/enums/status-code';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './app-delete-account-modal.component.html'
})
export class AppDeleteAccountModalComponent {
  public password: string;
  public errorMessage: string;
  public isWaiting: boolean;

  constructor(private userService: UserService, private dialogRef: MatDialogRef<AppDeleteAccountModalComponent>) {}

  public deleteUserAccount(): void {
    this.isWaiting = true;
    this.userService
      .deleteUserAccount(this.password)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe((res) => {
        if (res.code === StatusCode.Success) {
          this.dialogRef.close(true);
        } else if (res.code === StatusCode.BadRequest) {
          this.errorMessage = res.message;
        }
      });
  }
}
