import { Component, Input } from '@angular/core';

@Component({
    selector: 'media-image-item',
    templateUrl: 'media-image-item.component.html',
    styleUrls: [`media-image-item.component.scss`],
    host: { 'class': 'media-item'}
  })
export class MediaImageItemComponent {

    @Input() image: string;
    @Input() tags: string[];
    thumbnailAspectRatio = { width: 6, height: 4 };
    thumbnailDimensions = { width: 350, height: 200 };

  
  } 
