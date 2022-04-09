import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleProvider } from './locale-provider';
import { AppTitleService } from './title.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor(private router: Router, private title: AppTitleService, private localeProvider: LocaleProvider) {}

  public signOut(): void {
    this.localeProvider.resetToBrowserSettingsLocale();
    this.title.setTitle();
    TokenService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
