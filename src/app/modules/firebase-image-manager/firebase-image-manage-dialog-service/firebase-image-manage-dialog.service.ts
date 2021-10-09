import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { FirebaseImageManageDialogComponent } from '../firebase-image-manage-dialog/firebase-image-manage-dialog.component';

@Injectable()
export class FirebaseImageManageDialogService {

  constructor(
    private matDialog: MatDialog
  ) {}

  OnOpen() {
    const dialogRef = this.matDialog.open(FirebaseImageManageDialogComponent, { panelClass: 'dialog-responsive', disableClose: true });
    return dialogRef.afterClosed().pipe(
      filter(_ => !!_),
    )
  }
}
