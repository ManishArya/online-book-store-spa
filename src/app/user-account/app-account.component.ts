import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../services/title.service';

@Component({
  selector: 'app-account',
  template: '<app-account-section></app-account-section>'
})
export class AppAccountComponent implements OnInit {
  constructor(private title: AppTitleService) {}

  public ngOnInit(): void {
    this.title.setTitle('Account');
  }
}
