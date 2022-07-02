import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import AccountSection from './account-section';
import { AccountSectionName } from './account-section-name';
import { AppAccountSectionService } from './app-account-section.service';

@Component({
  selector: 'app-account-section',
  templateUrl: './app-account-section.component.html',
  styleUrls: ['./app-account-section.component.scss']
})
export class AppAccountSectionComponent implements OnDestroy {
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
  private readonly _destory$ = new Subject<void>();
  @ViewChild(MatAccordion) private accordion: MatAccordion;

  constructor(
    private accountSectionService: AppAccountSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.url.pipe(takeUntil(this._destory$)).subscribe(() => {
      const sectionName = route.snapshot.firstChild?.data?.['sectionName'];
      console.log(route?.snapshot);
      this.calculateIndex(sectionName);
    });
  }

  public ngOnDestroy(): void {
    this._destory$.next();
    this._destory$.complete();
  }

  public changeSection(name: number | undefined): void {
    if (name || name === 0) {
      this.sectionName = name;
      this.router.navigateByUrl(`user-account/${AccountSectionName[name]}`);
    }
  }

  public changeSubsection(index: number): void {
    this.activeIndex = index;
    this.accountSectionService.activeIndexChanges(index);
  }

  public expandAllSections(): void {
    this.accordion.openAll();
  }

  public collpaseAllSections(): void {
    this.accordion.closeAll();
  }

  private calculateIndex(sectionName: AccountSectionName): void {
    //   this.sectionName = sectionName;
    console.log(this.sectionName);
    this.activeIndex = 0;
    this.accountSectionService.activeIndexChanges(0);
  }
}
