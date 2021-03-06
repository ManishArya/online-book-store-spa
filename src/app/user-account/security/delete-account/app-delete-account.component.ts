import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './app-delete-account.component.html'
})
export class AppDeleteAccountComponent {
  public password: string;
  public errorMessage: string;
  public isWaiting: boolean;

  constructor(private authService: AuthService, private userService: UserService) {}

  public deleteAccount(): void {
    this.isWaiting = true;
    this.userService
      .deleteUserAccount(this.password)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.authService.signOut();
          }
        },
        (err) => {
          this.errorMessage = err.error.content;
        }
      );
  }
}
