import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-field-error',
  template: `<span [ngClass]="{ 'error-icon error-label mt-lg': validationMessage }">{{ validationMessage }}</span>`
})
export class AppFieldErrorComponent implements OnChanges {
  public validationMessage: string;
  @Input() public validations: { [key: string]: string };
  @Input() public fieldName: string;

  public ngOnChanges(): void {
    this.validationMessage = this.getValidationMessage();
  }

  private getValidationMessage(): string {
    return this.validations?.[this.fieldName];
  }
}
