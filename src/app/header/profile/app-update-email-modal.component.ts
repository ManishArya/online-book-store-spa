import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './app-update-email-modal.component.html'
})
export class AppUpdateEmailModalComponent {
  public password: string;
  public isWaiting: boolean;
  public email: string;

  constructor(
    private dialogRef: MatDialogRef<AppUpdateEmailModalComponent>,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  public updateEmail(): void {
    this.isWaiting = true;
    this.userService
      .updateEmailAddress(this.email, this.password)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.dialogRef.close(true);
          }
        },
        (err) => this.toastService.open(err.error.content['password'] || err.error.content['email'])
      );
  }
}
