import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';

export function getConfirmationDialogEntryComponents() {
  return [
    ConfirmationModalComponent
  ];
}

export function getConfirmationDialogProviders() {
  return [
    ConfirmationDialogService
  ]
}
