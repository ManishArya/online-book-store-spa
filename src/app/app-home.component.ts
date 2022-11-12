import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  templateUrl: './app-home.component.html'
})
export class AppHomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    if (TokenService.Token) {
      this.authService.setUserLoggedStatus(true);
      this.router.navigateByUrl(this.router.url ?? '');
    }
  }
}
