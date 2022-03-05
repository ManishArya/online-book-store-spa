import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-security-main-content',
  templateUrl: './app-security-main-content.component.html',
  styleUrls: ['./app-security-main-content.component.scss']
})
export class AppSecurityMainContentComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor() {}

  ngOnInit(): void {}
}
