import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AppCommaSeparatorPipe } from '../pipes/app-comma-separator.pipe';
import { AppConfirmationDialogComponent } from './app-confirmation-dialog/app-confirmation-dialog.component';
import { AppErrorDisplayComponent } from './app-error-display/app-error-display.component';
import { AppNotFoundComponent } from './app-not-found/app-not-found.component';
import { AppPasswordViewerComponent } from './app-password-viewer/app-password-viewer.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    AppConfirmationDialogComponent,
    AppErrorDisplayComponent,
    AppPasswordViewerComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppCommaSeparatorPipe
  ],
  declarations: [
    AppErrorDisplayComponent,
    AppConfirmationDialogComponent,
    AppCommaSeparatorPipe,
    AppNotFoundComponent,
    AppPasswordViewerComponent
  ]
})
export class AppSharedModule {}
