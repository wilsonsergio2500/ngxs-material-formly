import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IImagesOnResizerRemoveRequest } from '../../../states/media/images-on-resizer/images-on-resizer.model';

@Component({
    selector: 'media-image-item',
    templateUrl: 'media-image-item.component.html',
    styleUrls: [`media-image-item.component.scss`],
    host: { 'class': 'media-item'}
  })
export class MediaImageItemComponent {

    @Input() key: string;
    @Input() image: string;
    @Input() tags: string[];
    thumbnailAspectRatio = { width: 6, height: 4 };
    thumbnailDimensions = { width: 350, height: 200 };
    @Output() remove = new EventEmitter<IImagesOnResizerRemoveRequest>();


    onRemove() {
        if (this.remove) {
            const request = <IImagesOnResizerRemoveRequest>{ Id: this.key, Image: this.image}
            this.remove.emit(request);
        }
    }
  
  } 
