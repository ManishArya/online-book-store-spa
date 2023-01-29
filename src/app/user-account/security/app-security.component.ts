import { Component, OnInit } from '@angular/core';
import { AppAccountSectionContentComponent } from '../account-section/app-account-section-content.component';
import { AppAccountSectionService } from '../account-section/app-account-section.service';

@Component({
  selector: 'app-security',
  templateUrl: './app-security.component.html'
})
export class AppSecurityComponent extends AppAccountSectionContentComponent implements OnInit {
  constructor(accountSectionService: AppAccountSectionService) {
    super(accountSectionService);
  }

  public ngOnInit(): void {
    this.listenToSectionIndexChanges();
  }
}
