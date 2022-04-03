import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AppCommaSeparatorPipe } from '../pipes/app-comma-separator.pipe';
import { AppLocalePipe } from '../pipes/app-locale.pipe';
import { AppAvatarComponent } from './app-avatar/app-avatar.component';
import { AppConfirmationDialogComponent } from './app-confirmation-dialog/app-confirmation-dialog.component';
import { AppFieldErrorComponent } from './app-field-error/app-field-error.component';
import { AppNotFoundComponent } from './app-not-found/app-not-found.component';
import { AppPasswordViewerComponent } from './app-password-viewer/app-password-viewer.component';
import { AppToastComponent } from './app-toast/app-toast.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    AppConfirmationDialogComponent,
    AppPasswordViewerComponent,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppCommaSeparatorPipe,
    AppFieldErrorComponent,
    AppAvatarComponent,
    AppLocalePipe
  ],
  declarations: [
    AppConfirmationDialogComponent,
    AppCommaSeparatorPipe,
    AppNotFoundComponent,
    AppPasswordViewerComponent,
    AppFieldErrorComponent,
    AppAvatarComponent,
    AppToastComponent,
    AppLocalePipe
  ]
})
export class AppSharedModule {}
