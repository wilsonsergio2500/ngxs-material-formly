import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Promise } from 'q';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Helpers } from './utils/helpers';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { defaults } from '../config/defaults';
import { ISizeDimensions } from '../config/contracts/dimensions';

/**
 * usage:
    <image-rio-viewer [actual-dimensions]="dimensions"  [image-url]="thumbnailImage" [gray-out]="_disabled"
                      [aspect-ratio]="aspectRatio" [preserve-image-aspect-ratio]="viewerPreserveAspectRatio"
                      delay-show="200" ></image-rio-viewer>
 */

@Component({
  selector: 'image-rio-viewer',
  templateUrl: 'image-rio-viewer.component.html',
  styleUrls: [`image-rio-viewer.component.scss`]
})
export class ImageRioViewerComponent implements OnInit {


    private _imageUrl: string = null;
    private _grayscale: boolean = false;
    Loading: boolean = true;
    aspectRatioClass = 'none';
    style = {
        'background-position': 'center center',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
    };

    constructor(private zone: NgZone) {}
  

    @Input('preserve-image-aspect-ratio')
    private preserveAspectRatio = false;

    @Input('original-image-size')
    private originalImageSize = false;

    @Input('actual-dimensions')
    actualDimensions: ISizeDimensions = defaults.viewer.imageDimensions

    @Input('aspect-ratio')
    aspectRatio: ISizeDimensions = defaults.viewer.aspectRatio;

    @Input('image-quality')
    private quality = defaults.viewer.imageQuality;

    @Input('delay-show')
    private delayShow = defaults.viewer.delayShow;

    @Input('loading-spinner-diameter')
    loadingdiameter = defaults.viewer.loadingDiameter;

    @Input('gray-out')
    set grayscale(value: boolean) {
        const coerceval = coerceBooleanProperty(value);
        if (coerceval != this._grayscale) {
            this._grayscale = coerceval;
            this.bindImage();
        }
    }

    @Input('image-url')
    set imageUrl(value: string) {
        this._imageUrl = value;
        setTimeout(this.bindImage.bind(this), 50)
    }

  cacheImage(src: string): Promise<string> {

    return Promise<string>((resolve, reject) => {

      let img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(src);
      }
      img.onerror = (e) => {
        reject(e);
      }

    });
  }

  ngOnInit(): void {
    if (this.preserveAspectRatio) {
      this.style['background-size'] = 'contain';
    }
    this.bindAspectRatio();
  }

  bindImage() {

    this.Loading = true;

    if (!!this._imageUrl) {
      const bimage = this.getImageAsConfig();

      from(this.cacheImage(bimage) as PromiseLike<string>).pipe(
        delay(this.delayShow)
      ).subscribe(g => {
        this.zone.run(() => {
          this.style['background-image'] = `url(${bimage})`;
          this.Loading = false;
        });
      })

    }
  }

  bindAspectRatio() {
    const aspectRatioClassName = Helpers.CreateAspecRatioStyle(this.aspectRatio.width, this.aspectRatio.height);
      this.aspectRatioClass = aspectRatioClassName;
  }

  getImageAsConfig() {
    let params = `?quality=${this.quality}`;
    if (!this.originalImageSize) {
      params = `${params}&size=${this.actualDimensions.width}x${this.actualDimensions.height}`;
    }
    const image = `${this._imageUrl}${params}`;
    if (this._grayscale) {
      return `${image}&grayscale`;
    }
    return image;
  }
}
