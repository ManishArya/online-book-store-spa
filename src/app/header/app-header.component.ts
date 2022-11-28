import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LocaleProvider } from '../services/locale-provider';
import { MyListService } from '../services/my-list.service';
import { PreferencesService } from '../services/preferences.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  public readonly login_avatar_url = './../../assets/images/login_avatar.jpg';
  public profileAvatarBase64: string;
  public name: string;
  public listCount: number = 0;
  public isUserLogged: boolean = false;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private myListService: MyListService,
    private authService: AuthService,
    private preferencesService: PreferencesService,
    private localeProvider: LocaleProvider
  ) {}

  public ngOnInit(): void {
    this.authService.isUserLogged$
      .pipe(
        takeUntil(this.ngUnSubscribe),
        filter((u) => !!u),
        tap((u) => (this.isUserLogged = u)),
        switchMap(() =>
          forkJoin({
            profile: this.userService.getProfile(),
            preferences: this.preferencesService.getPreferences(),
            userPermissions: this.userService.getUserPermissions(),
            count: this.myListService.getListCounts()
          })
        )
      )
      .subscribe((res) => {
        this.userService.updateUserProfile(res.profile.content);
        this.preferencesService.toggleTheme(res.preferences.content.enableDarkTheme);
        this.localeProvider.changeLocale(res.preferences.content.locale);
        this.listCount = res.count.content;
      });

    this.listenToUserProfileChanges();
    this.listenToMyListChanges();
  }

  public ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  public navigateToAccountPage(): void {
    this.router.navigateByUrl('user-account');
  }

  public navigateToProfilePage(): void {
    this.router.navigateByUrl('profile');
  }

  public navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  public navigateToMyListPage(): void {
    this.router.navigateByUrl('myList');
  }

  public navigateToLoginPage(): void {
    this.router.navigateByUrl('account/login');
  }

  public navigateToRegisterPage(): void {
    this.router.navigateByUrl('account/newUser');
  }

  public signOut(): void {
    this.authService.signOut();
  }

  private listenToUserProfileChanges(): void {
    this.userService.userProfile$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res) => {
      this.profileAvatarBase64 = res.avatar;
      this.name = res.name;
    });
  }

  private listenToMyListChanges(): void {
    this.myListService.countIncrement$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((count) => {
      this.listCount += count;
    });

    this.myListService.countUpdate$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((count) => {
      this.listCount = count;
    });
  }
}
