import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { AppPageSpinnerComponent } from './app-page-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements OnDestroy {
  private componentRef: ComponentRef<AppPageSpinnerComponent>;

  constructor(private applicationRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver) {}

  public ngOnDestroy(): void {
    const spinnerEle = document.querySelector('app-page-spinner');
    if (spinnerEle) {
      document.body.removeChild(spinnerEle);
    }

    if (this.componentRef) {
      this.componentRef.instance.pageBlockingWaiting = false;
      this.componentRef.instance.pageNonBlockingWaiting = false;
      this.componentRef.destroy();
    }
  }

  public startPageLevelSpinner(): void {
    if (!this.componentRef) {
      this.registerComponent();
    }
    this.componentRef.instance.pageBlockingWaiting = true;
  }

  public endPageLevelSpinner(): void {
    if (this.componentRef) {
      this.componentRef.instance.pageBlockingWaiting = false;
    }
  }

  public startPageLevelNonBlockingSpinner(): void {
    if (!this.componentRef) {
      this.registerComponent();
    }
    this.componentRef.instance.pageNonBlockingWaiting = true;
  }

  public endPageLevelNonBlockingSpinner(): void {
    if (this.componentRef) {
      this.componentRef.instance.pageNonBlockingWaiting = false;
    }
  }

  private registerComponent() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AppPageSpinnerComponent);
    document.body.appendChild(document.createElement('app-page-spinner'));
    this.componentRef = this.applicationRef.bootstrap(factory);
  }
}
