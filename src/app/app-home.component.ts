import { Component, OnInit } from '@angular/core';
import { PreferencesService } from './services/preferences.service';
import { UserService } from './services/user.service';

@Component({
  templateUrl: './app-home.component.html'
})
export class AppHomeComponent implements OnInit {
  constructor(private userService: UserService, private preferencesService: PreferencesService) {}

  public ngOnInit(): void {
    this.userService.getProfile().subscribe((res) => this.userService.updateUserProfile(res.content));
  }
}
