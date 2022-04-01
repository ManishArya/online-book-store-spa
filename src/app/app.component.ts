import { Component, OnInit } from '@angular/core';
import { PreferencesService } from './services/preferences.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private preferenceService: PreferencesService) {}

  public ngOnInit(): void {
    //  this.preferenceService.getPreferences().subscribe((res) => console.log(res.content.enableDarkTheme));
  }
}
