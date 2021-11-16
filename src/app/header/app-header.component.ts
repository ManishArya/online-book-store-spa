import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  public safeResourceUrl: SafeResourceUrl;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private userService: UserService, private _sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.userService.userProfile$.subscribe((res) => {
      const photo = res.photo;
      this.safeResourceUrl = photo
        ? this._sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${photo}`)
        : './assets/images/avatar.png';
    });

    this.listenToProfilePictureChange();
  }

  public ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  public navigateToChangePasswoardPage(): void {
    this.router.navigateByUrl('change-password');
  }

  public navigateToProfilePage(): void {
    this.router.navigateByUrl('profile');
  }

  public navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  private listenToProfilePictureChange(): void {
    this.userService.profilePic$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((picture) => (this.safeResourceUrl = picture));
  }
}
