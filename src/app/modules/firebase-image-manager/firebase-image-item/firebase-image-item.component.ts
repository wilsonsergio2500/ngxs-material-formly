import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageFirebaseModel } from '@firebase-schemas/images/image.model';
import { IImagesRemoveRequest } from '@states/images/images.model';
import { GALLERY_DISPLAY_TYPE } from '../firebase-image-manage/firebase-image-manage.component';

/**
 * usage:
 <firebase-image-item *ngFor="let item of items" [item]="item"
    [displayType]="displayType"
    (onRemove)="removeImage($event)"
    (onSelect)="imageSelected($event)"></firebase-image-item>
 */

@Component({
  selector: 'firebase-image-item',
  templateUrl: 'firebase-image-item.component.html',
  styleUrls: [`firebase-image-item.component.scss`]
})
export class FirebaseImageItemComponent {

  @Input() item: IImageFirebaseModel;
  @Input() displayType: GALLERY_DISPLAY_TYPE = "PRESENTER"
  @Output() onSelect = new EventEmitter<string>(null)
  @Output() onRemove = new EventEmitter<IImagesRemoveRequest>(null);

  get displaySelection() {
    return this.displayType == "SELECTION";
  }

  remove() {
    const { Id : id, imageUrl : path } = this.item;
    this.onRemove.emit(<IImagesRemoveRequest>{ id, path });
  }

  select() {
    this.onSelect.emit(this.item.imageUrl);
  }

}
