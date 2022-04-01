import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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

  constructor(
    titleService: AppTitleService,
    accountSectionService: AppAccountSectionService,
    private preferenceService: PreferencesService
  ) {
    super(titleService, accountSectionService);
  }

  public ngOnInit(): void {
    this.setTitle('preferences');
    this.listenToSectionIndexChanges();
    this.getUserPreferences();
  }

  public onToggleChange(change: MatSlideToggleChange): void {
    this.preferenceService.setDarkTheme(change.checked).subscribe();
  }

  private getUserPreferences() {
    this.preferenceService.getPreferences().subscribe((p) => (this.enableDarkTheme = p.content.enableDarkTheme));
  }
}
