import { Component } from '@angular/core';
import { MediaManageDialogService } from '../../../../modules/media/media-manage-dialog-service/media-manage-dialog.service';

@Component({
  selector: 'admin-media-list',
  templateUrl: 'admin-media-list.component.html',
  styleUrls: [`admin-media-list.component.scss`]
})
export class AdminMediaListComponent {

  constructor(
    private mediaDialogService: MediaManageDialogService
  ) {
  }

  onShow() {
    this.mediaDialogService.OnOpen();

  }

} 
