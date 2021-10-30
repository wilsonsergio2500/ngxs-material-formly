import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FirebaseImageManageDialogService } from '../firebase-image-manage-dialog-service/firebase-image-manage-dialog.service';

@Component({
    selector: 'firebase-image-manage-gallery-uploader',
    templateUrl: 'firebase-image-manage-gallery-uploader.component.html',
  styleUrls: [`firebase-image-manage-gallery-uploader.component.scss`],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FirebaseImageManageGalleryUploaderComponent),
    multi: true
  }],
})
export class FirebaseImageManageGalleryUploaderComponent implements ControlValueAccessor, OnDestroy {
   

  @Input() bucket: string = 'images';
  disable = false;
  imgUrl = null;


  propagateChange = (_: any) => ({});
  propagateTouched = () => ({});
  subscriptions: Subscription[] = [];

  constructor(
    private firebaseImageGalleryService: FirebaseImageManageDialogService
    ) {
    }

  writeValue(url): void {
    if (url) {
      this.imgUrl = url;
    }
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }
  
  onOpenGallery() {

    const openGallery$ = this.firebaseImageGalleryService.OnOpen().pipe(
      tap(path => {
        this.imgUrl = path;
        this.propagateChange(this.imgUrl);
        this.propagateTouched();
      })
    );

    this.subscriptions = [...this.subscriptions, openGallery$.subscribe()];

  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
   
  
  } 
