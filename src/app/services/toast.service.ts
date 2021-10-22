import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public open(message: string): void {
    this.snackBar.open(message, 'close');
  }

  public dismiss(): void {
    this.snackBar.dismiss();
  }
}
