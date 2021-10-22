import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppTitleService } from './title.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor(private router: Router, private title: AppTitleService) {}

  public signOut(): void {
    this.title.setTitle();
    TokenService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
