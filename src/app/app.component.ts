import { Component, OnInit } from '@angular/core';
import { LocaleService } from './services/locale.service';
import { PreferencesService } from './services/preferences.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private preferenceService: PreferencesService, private localeService: LocaleService) {}

  public ngOnInit(): void {
    this.localeService.get('firstKey').subscribe((res) => console.log(res));
    //  this.preferenceService.getPreferences().subscribe((res) => console.log(res.content.enableDarkTheme));
  }
}
