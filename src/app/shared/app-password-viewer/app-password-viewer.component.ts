import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-viewer',
  templateUrl: './app-password-viewer.component.html',
  styleUrls: ['./app-password-viewer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppPasswordViewerComponent),
      multi: true
    }
  ]
})
export class AppPasswordViewerComponent implements ControlValueAccessor {
  public showPassword: boolean = false;
  public password: string;
  public showPasswordViewer: boolean;
  @Input() public label: string = 'Password';
  @Input() public isRequired: boolean = false;
  @Input() public inputClass: string;
  public onChange = (value: string) => {};
  public onTouched = () => {};

  public writeValue(value: string): void {
    if (value) {
      this.password = value;
      this.onChange(this.password);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public modelChange(value: string): void {
    this.showPasswordViewer = !!value;
    this.onChange(value);
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
