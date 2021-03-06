
import { Component, ViewChild, ElementRef, Input, NgZone, AfterViewInit, Optional, Self, forwardRef, Injector } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ControlValueAccessor, NgForm, NgControl, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import ImageCompressor from 'image-compressor.js';
import { IImageResizerIOResponse } from './contracts/image-resize-io-response';
import { ISizeDimensions } from '../config/contracts/dimensions';
import { defaults } from '../config/defaults';
import { ImageResizeIoAPI } from '../lib-api/image-resizer-io-api';


/**
 * usage:
      <image-resize-io-uploader [preview-flex-size]="20" [thumbnail-missing-image-url]="'https://im.ages.io/dSaintlp'"
              [aspect-ratio-width]="2"
              [aspect-ratio-height]="1"
              [thumbnail-actual-width]="300"
              [thumbnail-actual-height]="200">
    Upload
  </image-resize-io-uploader>
 */


@Component({
  selector: 'image-resize-io-uploader',
  templateUrl: 'image-rio-uploader.component.html',
  styleUrls: ['image-rio-uploader.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImageRioUploaderComponent),
    multi: true
  }],
})
export class ImageRioUploaderComponent implements ControlValueAccessor {


  public uploader: FileUploader = new FileUploader({
    allowedMimeType: ['image/jpeg', 'image/png'],
    allowedFileType: ['png', 'jpeg']
  });


    @Input('preview-flex-size')
    PreviewFlexSize = 100;

    @Input('thumbnail-missing-image-url')
    missingImageThumbnail = 'https://im.ages.io/dSaintlp';

    @Input('thumbnail-dimmensions')
    dimensions: ISizeDimensions = defaults.viewer.imageDimensions;

    @Input('thumbnail-aspect-ratio')
    aspectRatio: ISizeDimensions = defaults.viewer.aspectRatio;

    @Input('viewer-preserve-aspect-ratio')
    viewerPreserveAspectRatio: boolean = false;


  @ViewChild('inputFile', { static: false})
  private inputFile: ElementRef;

  $imgUrl: string;
  _disabled = false;
  Loading = false;
  

  propagateChange = (_: any) => ({});
  propagateTouched = () => ({});

  constructor(
  ) {
    
  }
  onClick() {
    (this.inputFile.nativeElement as HTMLInputElement).click();
  }
  fileSelected($event) {

    this.Loading = true;

    const imageCompressor = new ImageCompressor($event[0], {
      quality: .6,
      success: (response: File) => {

        this.uploadImage(response).then((imageUrl: string) => {
          this.Loading = false;
            this.$imgUrl = imageUrl;
          this.propagateChange(this.$imgUrl);
        })
      }
    })

  }

  uploadImage(file: File) {
      return ImageResizeIoAPI.Upload(file);
  }


  writeValue(value: any): void {
    if (!!value) {
      this.$imgUrl = value;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;

  }

  get thumbnailImage() {
      if (!!this.$imgUrl) {
      return this.$imgUrl;
    }
    return this.missingImageThumbnail;
  }
 

}
