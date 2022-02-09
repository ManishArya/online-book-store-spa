import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './app-field-error.component.html'
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
