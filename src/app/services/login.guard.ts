import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canLoad(): Promise<boolean> {
    return this.canActivate();
  }

  canActivate(): Promise<boolean> {
    if (TokenService.Token) {
      return Promise.resolve(true);
    }
    return this.router.navigateByUrl('/login');
  }
}
