import { Component } from '@angular/core';
import { LogOutService } from 'src/app/services/log-out.service';

@Component({
  selector: 'app-log-out',
  template: `<a (click)="signOut()">Sign out</a>`
})
export class AppLogOutComponent {
  constructor(private logOutService: LogOutService) {}

  public signOut(): void {
    this.logOutService.signOut();
  }
}
