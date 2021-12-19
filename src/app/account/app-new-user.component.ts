import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
import { LoginService } from '../services/login.service';
import { UserService } from './../services/user.service';

@Component({
  templateUrl: './app-new-user.component.html'
})
export class AppNewUserComponent implements OnInit {
  @ViewChild('photo') private photo: ElementRef;
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
      mobile: [],
      email: [],
      password: []
    });
  }

  public addUser(): void {
    const formData = new FormData();
    formData.set('name', this.formGroup.get('name')?.value);
    formData.set('username', this.formGroup.get('username')?.value);
    formData.set('mobile', this.formGroup.get('mobile')?.value);
    formData.set('email', this.formGroup.get('email')?.value);
    formData.set('password', this.formGroup.get('password')?.value);
    formData.set('photo', this.photo.nativeElement.files[0]);
    this.isWaiting = true;

    this.userService
      .addNewUser(formData)
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
