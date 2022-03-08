import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppTitleService } from 'src/app/services/title.service';
import { AppAccountSectionService } from '../account-section/app-account-section.service';

@Component({
  selector: 'app-security',
  templateUrl: './app-security.component.html',
  styleUrls: ['./app-security.component.scss']
})
export class AppSecurityComponent implements OnInit, OnDestroy {
  public index: number = 0;
  private readonly _destory$ = new Subject<void>();

  constructor(private titleService: AppTitleService, private accountSectionService: AppAccountSectionService) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Account Security');
    this.listenToSectionIndexChanges();
  }

  public ngOnDestroy(): void {
    this._destory$.next();
    this._destory$.complete();
  }

  private listenToSectionIndexChanges(): void {
    this.accountSectionService.setActiveIndex$
      .pipe(takeUntil(this._destory$))
      .subscribe((index) => (this.index = index));
  }
}
