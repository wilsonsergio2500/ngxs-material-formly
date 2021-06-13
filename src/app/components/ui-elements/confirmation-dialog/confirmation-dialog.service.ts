
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import { filter } from 'rxjs/operators';

@Injectable()
export class ConfirmationDialogService{

  constructor(
    private dialog: MatDialog
  ) {
  }

  OnConfirm(message: string, width = '250px',) {
    const  dialogInstance = this.dialog.open(ConfirmationModalComponent, {
      width,
      disableClose: true,
      data: { message }
    });
    return dialogInstance.afterClosed().pipe(filter(x => !!x));
  }

}
