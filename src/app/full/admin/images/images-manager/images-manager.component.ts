import { Component } from '@angular/core';
import { FirebaseImageManageDialogService } from '../../../../modules/firebase-image-manager/firebase-image-manage-dialog-service/firebase-image-manage-dialog.service';

@Component({
  selector: 'images-manager',
  templateUrl: 'images-manager.component.html',
  styleUrls: [`images-manager.component.scss`]
})
export class ImagesManagerComponent {


  constructor(
    private firebaseImageManageDialogService: FirebaseImageManageDialogService
  ) {
  }

  onTry() {
    this.firebaseImageManageDialogService.OnOpen();
  }

}
