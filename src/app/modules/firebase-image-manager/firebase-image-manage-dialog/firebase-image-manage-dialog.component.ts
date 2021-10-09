import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GALLERY_DISPLAY_TYPE } from '../firebase-image-manage/firebase-image-manage.component';

@Component({
  selector: 'firebase-image-manage-dialog',
  templateUrl: 'firebase-image-manage-dialog.component.html',
  styleUrls: [`firebase-image-manage-dialog.component.scss`]
})
export class FirebaseImageManageDialogComponent {

  displayType: GALLERY_DISPLAY_TYPE = 'SELECTION';
  constructor(
    private matDialogRef: MatDialogRef<FirebaseImageManageDialogComponent>
  ) {
  }

  onClose() {
    this.matDialogRef.close();
  }

  onSelectItem(path: string) {
    this.matDialogRef.close(path);
  }
}
