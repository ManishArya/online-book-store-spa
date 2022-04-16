import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PreferencesService } from './services/preferences.service';
import { UserService } from './services/user.service';

@Component({
  templateUrl: './app-home.component.html'
})
export class AppHomeComponent implements OnInit {
  constructor(private userService: UserService, private preferencesService: PreferencesService) {}

  public ngOnInit(): void {
    forkJoin({
      profile: this.userService.getProfile(),
      preferences: this.preferencesService.getPreferences()
    }).subscribe((res) => {
      this.userService.updateUserProfile(res.profile.content);
      this.preferencesService.toggleTheme(res.preferences.content.enableDarkTheme);
    });
  }
}
