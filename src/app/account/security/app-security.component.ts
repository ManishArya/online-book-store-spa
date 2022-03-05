import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-security',
  templateUrl: './app-security.component.html',
  styleUrls: ['./app-security.component.scss']
})
export class AppSecurityComponent implements OnInit {
  constructor(private titleService: AppTitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Account Security');
  }
}
