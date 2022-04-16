import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../services/title.service';

@Component({
  selector: 'app-account',
  templateUrl: './app-account.component.html'
})
export class AppAccountComponent implements OnInit {
  constructor(private title: AppTitleService) {}

  public ngOnInit(): void {
    this.title.setTitle('Account');
  }
}
