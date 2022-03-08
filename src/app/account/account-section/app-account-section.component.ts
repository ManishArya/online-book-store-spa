import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppAccountSectionService } from './app-account-section.service';

@Component({
  selector: 'app-account-section',
  templateUrl: './app-account-section.component.html',
  styleUrls: ['./app-account-section.component.scss']
})
export class AppAccountSectionComponent implements OnDestroy {
  public activeIndex: number = 0;
  private readonly _destory$ = new Subject<void>();
  @ViewChild(MatAccordion) private accordion: MatAccordion;

  constructor(
    private accountSectionService: AppAccountSectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.url.pipe(takeUntil(this._destory$)).subscribe(() => {
      const sectionName = route.snapshot.firstChild?.data?.['sectionName'];
      this.calculateIndex(sectionName);
    });
  }

  public ngOnDestroy(): void {
    this._destory$.next();
    this._destory$.complete();
  }

  public changeSection(sectionName: string): void {
    this.router.navigateByUrl(`account/${sectionName}`);
  }

  public onSubSecionClick(): void {}

  public changeIndex(index: number): void {
    this.activeIndex = index;
    this.accountSectionService.setActiveIndex(index);
  }

  public expandAllSections(): void {
    this.accordion.openAll();
  }

  public collpaseAllSections(): void {
    this.accordion.closeAll();
  }

  private calculateIndex(sectionName: string): void {
    if (sectionName === 'security') {
      this.activeIndex = 0;
    } else if (sectionName === 'preferences') {
      this.activeIndex = 3;
    }
  }
}
