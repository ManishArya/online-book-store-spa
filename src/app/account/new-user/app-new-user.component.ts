import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response.model';
import { UserProfile } from '../../models/user-profile.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './app-new-user.component.html'
})
export class AppNewUserComponent implements OnInit {
  public validations: { [key: string]: string };
  public isWaiting: boolean;
  public formGroup: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [],
      email: [],
      password: []
    });
  }

  public addUser(): void {
    const user = {
      name: this.formGroup.get('name')?.value,
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value
    } as UserProfile;

    this.isWaiting = true;

    this.userService
      .addNewUser(user)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          if (res.isSuccess) {
            this.authService.login(res.content.token);
          }
        },
        (err: HttpErrorResponse) => {
          this.validations = (err.error as ApiResponse<{ [key: string]: string }>).content;
        }
      );
  }

  public cancel(): void {
    this.router.navigateByUrl('/account/login');
  }
}
