import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationDialogOption } from './confirmation-dialog-option';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './app-confirmation-dialog.component.html',
  styleUrls: ['./app-confirmation-dialog.component.scss']
})
export class AppConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationDialogOption,
    private dialogRef: MatDialogRef<AppConfirmationDialogComponent>
  ) {}
}
