
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
