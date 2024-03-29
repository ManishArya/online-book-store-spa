import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LocaleProvider } from 'src/app/services/locale-provider';
import { PreferencesService } from 'src/app/services/preferences.service';
import { AppAccountSectionContentComponent } from '../account-section/app-account-section-content.component';
import { AppAccountSectionService } from '../account-section/app-account-section.service';

@Component({
  selector: 'app-preference',
  templateUrl: './app-preference.component.html'
})
export class AppPreferenceComponent extends AppAccountSectionContentComponent implements OnInit {
  public enableDarkTheme: boolean;
  public locale: string;
  public supportedLanguages: readonly { language: string; locale: string }[] = [
    { language: 'english', locale: 'en' },
    { language: 'hindi', locale: 'hi' }
  ];

  constructor(
    accountSectionService: AppAccountSectionService,
    private preferenceService: PreferencesService,
    private localeProvider: LocaleProvider
  ) {
    super(accountSectionService);
  }

  public ngOnInit(): void {
    this.getUserPreferences();
    this.listenToSectionIndexChanges();
  }

  public onDarkThemeChanges(change: MatSlideToggleChange): void {
    this.preferenceService.setDarkTheme(change.checked).subscribe(() => {
      this.preferenceService.clearPreferenceCache();
      this.preferenceService.toggleTheme(change.checked);
    });
  }

  public onLocaleChanges(locale: string): void {
    this.preferenceService.setLocale(locale).subscribe(() => {
      this.localeProvider.changeLocale(locale);
      this.preferenceService.clearPreferenceCache();
    });
  }

  private getUserPreferences() {
    this.preferenceService.getPreferences().subscribe((p) => {
      this.enableDarkTheme = p.content.enableDarkTheme;
      this.locale = p.content.locale;
    });
  }
}
