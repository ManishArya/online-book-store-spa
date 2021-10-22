import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IApiErrorResponse } from 'src/app/models/api-error-response.model';

@Component({
  selector: 'app-error-display',
  templateUrl: './app-error-display.component.html',
  styleUrls: ['./app-error-display.component.scss']
})
export class AppErrorDisplayComponent implements OnChanges {
  @Input() public fieldName: string;
  @Input() public error: IApiErrorResponse | undefined;
  @Input() public formGroup: FormGroup;
  public isError: boolean;
  public errorMessage: string | undefined;

  public ngOnChanges(): void {
    this.errorMessage = this.getErrorMessage();
    this.isError = !!this.errorMessage;
    this.setErrorInFormControl();
  }

  private setErrorInFormControl() {
    const control = this.formGroup?.get(this.fieldName);

    if (control) {
      control.setErrors(this.isError ? { error: true } : null);
    }
  }

  private getErrorMessage(): string | undefined {
    const errorMessage = this.error?.errorMessages;
    if (errorMessage) {
      return errorMessage[this.fieldName];
    }
    return undefined;
  }
}
