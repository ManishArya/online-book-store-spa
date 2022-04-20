import { Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent implements OnChanges {
  @Input() public isWaiting: boolean;
  @Input() public isFullPage: boolean = false;
  @Input() public nonBlocking: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnChanges(): void {
    if (!this.isFullPage) {
      this.renderer.setStyle(this.el.nativeElement.parentElement, 'position', this.isWaiting ? 'relative' : '');
    }
  }
}
