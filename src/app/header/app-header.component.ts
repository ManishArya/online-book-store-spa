import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { LogOutService } from '../services/log-out.service';
import { MyListService } from '../services/my-list.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  public imageSrc: string;
  public name: string;
  public listCount: number = 0;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private myListService: MyListService,
    private logOutService: LogOutService
  ) {}

  public ngOnInit(): void {
    combineLatest([this.userService.userProfile$, this.myListService.getListCounts()]).subscribe((res) => {
      this.imageSrc = res[0].avatar;
      this.name = res[0].name;
      this.listCount = res[1].content;
    });

    this.myListService.myListCountsRefresh$.subscribe((count) => (this.listCount = this.listCount + count));
  }

  public ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  public navigateToAccountPage(): void {
    this.router.navigateByUrl('account/security');
  }

  public navigateToProfilePage(): void {
    this.router.navigateByUrl('profile');
  }

  public navigateToDashboard(): void {
    this.router.navigateByUrl('');
  }

  public navigateToMyListPage(): void {
    this.router.navigateByUrl('myList');
  }

  public signOut(): void {
    this.logOutService.signOut();
  }
}
