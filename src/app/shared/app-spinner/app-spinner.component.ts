import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent implements OnChanges, OnInit {
  @Input() public isWaiting: boolean;
  @Input() public isFullPage: boolean = false;
  @Input() public nonBlocking: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnChanges(): void {
    if (!this.isFullPage && !this.nonBlocking) {
      this.renderer.setStyle(this.el.nativeElement.parentElement, 'position', this.isWaiting ? 'relative' : '');
    }
  }

  public ngOnInit() {
    if (this.isFullPage || this.nonBlocking) {
      document.body.append(this.el.nativeElement);
    }
  }
}
