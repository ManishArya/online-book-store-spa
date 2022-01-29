import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  public imageSrc: string;
  public name: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.userProfile$.subscribe((res) => {
      this.imageSrc = res.avatar;
      this.name = res.name;
    });

    this.listenToProfileChange();
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

  private listenToProfileChange(): void {
    this.userService.userProfile$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((profile) => {
      this.imageSrc = profile.avatar;
      this.name = profile.name;
    });
  }
}
