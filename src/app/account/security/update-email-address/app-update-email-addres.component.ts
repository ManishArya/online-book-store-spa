import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-email-addres',
  templateUrl: './app-update-email-addres.component.html',
  styleUrls: ['./app-update-email-addres.component.scss']
})
export class AppUpdateEmailAddresComponent {
  public password: string;
  public isWaiting: boolean;
  public email: string;
  public errorMessage: string;

  constructor(private userService: UserService) {}

  public updateEmail(): void {
    this.isWaiting = true;
    this.userService
      .updateEmailAddress(this.email, this.password)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.errorMessage = '';
            this.email = '';
            this.password = '';
          }
        },
        (err) => (this.errorMessage = err.error.content['password'] || err.error.content['email'])
      );
  }
}
