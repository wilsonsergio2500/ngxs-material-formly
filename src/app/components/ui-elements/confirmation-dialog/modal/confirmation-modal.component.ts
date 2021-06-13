
import { Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  constructor(
    public matDialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone : NgZone
  ) {
  }

  onOk() {
    this.ngZone.run(() => this.matDialogRef.close(true));
  }
  onCancel() {
    this.ngZone.run(() => this.matDialogRef.close(false));
  }
}
