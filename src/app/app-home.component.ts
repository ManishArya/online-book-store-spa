import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PreferencesService } from './services/preferences.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

@Component({
  templateUrl: './app-home.component.html'
})
export class AppHomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private preferencesService: PreferencesService,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    if (TokenService.Token) {
      this.authService.setUserLoggedStatus(true);
      this.router.navigateByUrl('');
    }
  }
}
