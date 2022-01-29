import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
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

  constructor(private router: Router, private userService: UserService, private myListService: MyListService) {}

  public ngOnInit(): void {
    combineLatest([this.userService.userProfile$, this.myListService.getListCounts()]).subscribe((res) => {
      this.imageSrc = res[0].avatar;
      this.name = res[0].name;
      this.listCount = res[1].content;
    });
  }

  public ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  public navigateToChangePasswoardPage(): void {
    this.router.navigateByUrl('change-password');
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
}
