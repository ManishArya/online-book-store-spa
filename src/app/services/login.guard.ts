import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { PreferencesService } from './preferences.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private preferncesService: PreferencesService) {}

  canLoad(): Promise<boolean> {
    return this.canActivate();
  }

  async canActivate(): Promise<boolean> {
    if (TokenService.Token) {
      await this.preferncesService.changeUserLocale();
      return Promise.resolve(true);
    }
    return this.router.navigateByUrl('/login');
  }
}
