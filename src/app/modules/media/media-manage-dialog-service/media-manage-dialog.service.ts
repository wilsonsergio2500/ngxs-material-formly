import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { MediaManageDialogComponent } from '../media-manage-dialog/media-manage-dialog.component';

@Injectable()
export class MediaManageDialogService {

  constructor(
    private matDialog: MatDialog
  ) {}

  OnOpen() {
    const dialogRef = this.matDialog.open(MediaManageDialogComponent, { panelClass: 'dialog-responsive', disableClose: true });
    return dialogRef.afterClosed().pipe(
      filter(_ => !!_),
    )
  }

}
