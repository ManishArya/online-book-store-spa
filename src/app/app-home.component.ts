import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IdleWatcherService } from './services/idle-watcher.service';
import { PreferencesService } from './services/preferences.service';
import { UserService } from './services/user.service';

@Component({
  templateUrl: './app-home.component.html',
  providers: [IdleWatcherService]
})
export class AppHomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private preferencesService: PreferencesService,
    private idleService: IdleWatcherService
  ) {}

  public ngOnInit(): void {
    this.idleService.startWatcher();
    forkJoin({
      profile: this.userService.getProfile(),
      preferences: this.preferencesService.getPreferences()
    }).subscribe((res) => {
      this.userService.updateUserProfile(res.profile.content);
      this.preferencesService.toggleTheme(res.preferences.content.enableDarkTheme);
    });
  }
}
