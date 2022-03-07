import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AppTitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-security',
  templateUrl: './app-security.component.html',
  styleUrls: ['./app-security.component.scss']
})
export class AppSecurityComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private titleService: AppTitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Account Security');
  }
}
