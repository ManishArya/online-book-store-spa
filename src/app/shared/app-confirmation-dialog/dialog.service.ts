import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConfirmationDialogComponent } from './app-confirmation-dialog.component';
import { IConfirmationDialogOption } from './confirmation-dialog-option';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private matDialog: MatDialog) {}

  public openConfirmationDialog(
    options: IConfirmationDialogOption
  ): MatDialogRef<AppConfirmationDialogComponent, boolean> {
    return this.matDialog.open(AppConfirmationDialogComponent, {
      data: options,
      width: '500px'
    });
  }
}
