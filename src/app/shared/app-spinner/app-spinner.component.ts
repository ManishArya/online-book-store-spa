import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent implements OnInit {
  @Input() public isWaiting: boolean;
  @Input() public isFullPage: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
