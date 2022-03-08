import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../services/title.service';

@Component({
  selector: 'app-account',
  templateUrl: './app-account.component.html',
  styleUrls: ['./app-account.component.scss']
})
export class AppAccountComponent implements OnInit {
  constructor(private title: AppTitleService) {}

  public ngOnInit(): void {
    this.title.setTitle('Account');
  }
}
