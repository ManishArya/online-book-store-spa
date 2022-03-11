import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/services/title.service';
import { AppAccountSectionContentComponent } from '../account-section/app-account-section-content.component';
import { AppAccountSectionService } from '../account-section/app-account-section.service';

@Component({
  selector: 'app-security',
  templateUrl: './app-security.component.html',
  styleUrls: ['./app-security.component.scss']
})
export class AppSecurityComponent extends AppAccountSectionContentComponent implements OnInit {
  constructor(accountSectionService: AppAccountSectionService, titleService: AppTitleService) {
    super(titleService, accountSectionService);
  }

  public ngOnInit(): void {
    this.setTitle('security');
    this.listenToSectionIndexChanges();
  }
}
