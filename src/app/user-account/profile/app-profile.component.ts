import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './app-profile.component.html'
})
export class AppProfileComponent implements OnInit {
  public userProfile: UserProfile;
  public isWaiting: boolean;
  public imageSrc: string;
  public name: string;
  public validations: { [key: string]: string };

  constructor(private userService: UserService, private toastService: ToastService) {}

  public ngOnInit(): void {
    this.getProfile().subscribe();
  }

  public update(): void {
    this.validations = {};
    this.isWaiting = true;
    const updatedProfile = { ...this.userProfile, avatar: undefined as any };
    this.userService
      .updateUser(updatedProfile)
      .pipe(
        finalize(() => (this.isWaiting = false)),
        switchMap((res) => this.getProfile())
      )
      .subscribe(
        (res) => {
          this.toastService.open('Profile Updated Successfully');
        },
        (err: HttpErrorResponse) => (this.validations = (err.error as ApiResponse<{ [key: string]: string }>).content)
      );
  }

  public avatarChanged(file: any): void {
    if (file) {
      const formData = new FormData();
      formData.set('avatar', file);
      this.userService
        .updateAvatar(formData)
        .pipe(
          filter((res) => res.isSuccess),
          switchMap(() => this.getProfile())
        )
        .subscribe({
          error: (err: HttpErrorResponse) => this.toastService.open((err.error as ApiResponse<string>).content)
        });
    }
  }

  public removeAvatar(): void {
    this.userService
      .removeAvatar()
      .pipe(switchMap(() => this.getProfile()))
      .subscribe();
  }

  private getProfile(): Observable<ApiResponse<UserProfile>> {
    this.isWaiting = true;
    return this.userService.getProfile().pipe(
      tap((res) => {
        this.userProfile = res.content;
        this.imageSrc = res.content.avatar;
        this.name = res.content.name;
        this.userService.updateUserProfile(this.userProfile);
      }),
      finalize(() => (this.isWaiting = false))
    );
  }
}
