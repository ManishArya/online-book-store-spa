import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
import { UserProfile } from '../models/user-profile.model';
import { LoginService } from '../services/login.service';
import { UserService } from './../services/user.service';

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
    private loginService: LoginService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [],
      username: [],
      email: [],
      password: []
    });
  }

  public addUser(): void {
    const user = {
      name: this.formGroup.get('name')?.value,
      username: this.formGroup.get('username')?.value,
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
            this.loginService.login(res.content.token);
          }
        },
        (err: HttpErrorResponse) => {
          this.validations = (err.error as IApiResponse<{ [key: string]: string }>).content;
        }
      );
  }

  public cancel(): void {
    this.router.navigateByUrl('/login');
  }
}
