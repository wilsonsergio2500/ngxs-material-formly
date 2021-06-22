import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'media-manage-dialog',
  templateUrl: 'media-manage-dialog.component.html',
  styleUrls: [`media-manage-dialog.component.scss`]
})
export class MediaManageDialogComponent {

  constructor(
    private matDialogRef: MatDialogRef<MediaManageDialogComponent>
  ) {
  }

  onClose() {
    this.matDialogRef.close();
  }

  onChange(path: string) {
    this.matDialogRef.close(path);
  }


} 
