import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { LocaleProvider } from '../services/locale-provider';
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
  public cartItemCount: number = 0;
  public isUserLogged: boolean = false;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
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
            count: this.cartService.getTotalQuantity()
          })
        )
      )
      .subscribe((res) => {
        this.userService.updateUserProfile(res.profile.content);
        this.preferencesService.toggleTheme(res.preferences.content.enableDarkTheme);
        this.localeProvider.changeLocale(res.preferences.content.locale);
        this.cartItemCount = res.count.content;
      });

    this.listenToUserProfileChanges();
    this.listenToCartItemQuantityChanges();
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

  public navigateToCartPage(): void {
    this.router.navigateByUrl('cart');
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

  private listenToCartItemQuantityChanges(): void {
    this.cartService.countIncrement$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((count) => {
      this.cartItemCount += count;
    });

    this.cartService.countUpdate$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((count) => {
      console.log(count);
      this.cartItemCount = count;
    });
  }
}
