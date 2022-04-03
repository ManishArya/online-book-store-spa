import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LocaleService } from 'src/app/services/locale.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { AppTitleService } from 'src/app/services/title.service';
import { AppAccountSectionContentComponent } from '../account-section/app-account-section-content.component';
import { AppAccountSectionService } from '../account-section/app-account-section.service';

@Component({
  selector: 'app-preference',
  templateUrl: './app-preference.component.html',
  styleUrls: ['./app-preference.component.scss']
})
export class AppPreferenceComponent extends AppAccountSectionContentComponent implements OnInit {
  public enableDarkTheme: boolean;
  public locale: string;
  public languages = [
    { lang: 'english', locale: 'en' },
    { lang: 'hindi', locale: 'hi' }
  ];

  constructor(
    titleService: AppTitleService,
    accountSectionService: AppAccountSectionService,
    private preferenceService: PreferencesService,
    private localeService: LocaleService
  ) {
    super(titleService, accountSectionService);
  }

  public ngOnInit(): void {
    this.localeService.get('firstKey').subscribe((res) => console.log(res));
    this.setTitle('preferences');
    this.listenToSectionIndexChanges();
    this.getUserPreferences();
  }

  public onDarkThemeChanges(change: MatSlideToggleChange): void {
    this.preferenceService.setDarkTheme(change.checked).subscribe();
  }

  public onLocaleChanges(locale: string): void {
    this.preferenceService.setLocale(locale).subscribe();
  }

  private getUserPreferences() {
    this.preferenceService.getPreferences().subscribe((p) => {
      this.enableDarkTheme = p.content.enableDarkTheme;
      this.locale = p.content.locale;
    });
  }
}
