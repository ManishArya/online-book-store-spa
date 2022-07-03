import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import AccountSection from './account-section';
import { AccountSectionName } from './account-section-name';
import { AppAccountSectionService } from './app-account-section.service';

@Component({
  selector: 'app-account-section',
  templateUrl: './app-account-section.component.html',
  styleUrls: ['./app-account-section.component.scss']
})
export class AppAccountSectionComponent {
  public sections: readonly AccountSection[] = [
    {
      labelName: 'security',
      iconClass: 'fa fa-shield fa-flip-vertical',
      order: 2,
      name: AccountSectionName.security,
      subsections: [
        {
          labelName: 'changePassword'
        },
        { labelName: 'email' },
        { labelName: 'deleteAccount' }
      ]
    },
    {
      labelName: 'preferences',
      iconClass: 'fa fa-cog',
      order: 1,
      name: AccountSectionName.preferences,
      subsections: [
        {
          labelName: 'darkTheme'
        },
        { labelName: 'languages' }
      ]
    },
    {
      labelName: 'address',
      iconClass: 'fa fa-address-card',
      order: 0,
      name: AccountSectionName.address,
      subsections: [{ labelName: 'address' }]
    }
  ];
  public activeIndex: number = 0;
  public sectionName: AccountSectionName;
  public accountSectionName = AccountSectionName;
  @ViewChild(MatAccordion) private accordion: MatAccordion;

  constructor(private accountSectionService: AppAccountSectionService, private router: Router) {
    router.events
      .pipe(
        take(1),
        filter((event) => event instanceof ActivationEnd),
        map((event) => (event as ActivationEnd).snapshot.data?.['sectionName'])
      )
      .subscribe((sectionName: AccountSectionName) => {
        if (sectionName || sectionName === AccountSectionName.security) this.setSectionNameAndIndex(sectionName);
      });
  }

  public changeSection(name: number | undefined): void {
    if (name || name === 0) {
      this.setSectionNameAndIndex(name);
      this.router.navigateByUrl(`user-account/${AccountSectionName[name]}`);
    }
  }

  public changeSubsection(index: any): void {
    this.activeIndex = index;
    this.accountSectionService.activeIndexChanges(index);
  }

  public expandAllSections(): void {
    this.accordion.openAll();
  }

  public collpaseAllSections(): void {
    this.accordion.closeAll();
  }

  private setSectionNameAndIndex(sectionName: AccountSectionName): void {
    this.sectionName = sectionName;
    this.activeIndex = 0;
    this.accountSectionService.activeIndexChanges(this.activeIndex);
  }
}
