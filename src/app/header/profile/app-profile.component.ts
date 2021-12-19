import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { IApiResponse } from 'src/app/models/api-response.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { AppTitleService } from 'src/app/services/title.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.scss']
})
export class AppProfileComponent implements OnInit {
  public userProfile: UserProfile;
  public safeResourceUrl: SafeResourceUrl;
  public isWaiting: boolean;
  public validations: { [key: string]: string };
  public isRemoveButtonShow: boolean;
  @ViewChild('photo') public photo: ElementRef;

  constructor(
    private userService: UserService,
    private title: AppTitleService,
    private _sanitizer: DomSanitizer,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.title.setTitle('profile');
    this.getProfile().subscribe();
  }

  public update(): void {
    this.validations = {};
    this.isWaiting = true;
    const updatedProfile = { ...this.userProfile, photo: undefined as any };
    this.userService
      .updateUser(updatedProfile)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        () => {
          this.toastService.open('Profile Updated Successfully');
        },
        (err: HttpErrorResponse) => (this.validations = (err.error as IApiResponse<{ [key: string]: string }>).content)
      );
  }

  public changePhoto(): void {
    if (this.photo) {
      this.photo.nativeElement.click();
    }
  }

  public uploadPhoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.set('photo', file);
      this.userService
        .updatePhoto(formData)
        .pipe(
          filter((res) => res.isSuccess),
          switchMap(() => this.getProfile())
        )
        .subscribe();
    }
  }

  public removePhoto(): void {
    this.userService
      .removePhoto()
      .pipe(switchMap(() => this.getProfile()))
      .subscribe();
  }

  private getProfile(): Observable<IApiResponse<UserProfile>> {
    this.isWaiting = true;
    return this.userService.getProfile().pipe(
      tap((res) => {
        this.userProfile = res.content;
        const photo = res.content.photo;
        if (photo) {
          this.isRemoveButtonShow = true;
          this.safeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${photo}`);
        } else {
          this.isRemoveButtonShow = false;
          this.safeResourceUrl = './assets/images/avatar.png';
        }
        this.userService.updateProfilePhoto(this.safeResourceUrl as string);
      }),
      finalize(() => (this.isWaiting = false))
    );
  }
}
