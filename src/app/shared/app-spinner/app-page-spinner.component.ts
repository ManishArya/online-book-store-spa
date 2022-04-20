import { Component } from '@angular/core';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './app-page-spinner.component.html'
})
export class AppPageSpinnerComponent {
  public pageBlockingWaiting: boolean;
  public pageNonBlockingWaiting: boolean;
}
