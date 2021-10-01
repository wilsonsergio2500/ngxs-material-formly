import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { IImageFirebaseModel } from '@firebase-schemas/images/image.model';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { ImagesCreateRecordAction } from '../../../states/images/images.actions';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
    selector: 'firebase-image-uploader-dialog',
    templateUrl: 'firebase-image-uploader-dialog.component.html',
    styleUrls: [`firebase-image-uploader-dialog.component.scss`]
  })
  export class FirebaseImageUploaderDialogComponent implements OnInit, OnDestroy {

  btnReadyLabel = 'Save';
  btnLoadingLabel = 'Saving..';
  formlyGroup: FormlyTypeGroup<IImageFirebaseModel>;
  formSubmited$: Subscription

  constructor(
    private store: Store,
    private actions: Actions,
    private matDialogRef: MatDialogRef<FirebaseImageUploaderDialogComponent>
    ) {
    }

  ngOnInit() {

    const tagsMaxSize = 5
    const maxSizeValidator = {
      expression: (formGroup) => {
        const a: string[] = formGroup ? formGroup.value : null;
        if (a && a.length && a.length > tagsMaxSize) {
          return false;
        }
        return true;
      },
      message: () => {
        return `Exceded the maximu limit ${tagsMaxSize}`;
      }
    }

    const tags = new FieldTypes.ChipField('Tags', 'Enter tags', true, 100, { validators: { maxSizeValidator } });
    const imageUrl = new FieldTypes.FirebaseImageUploader('Upload', true, 30, { bucket: 'images' }, { className: 'firebase-image-uploader' });

    this.formlyGroup = new FormlyTypeGroup<IImageFirebaseModel>({
      imageUrl,
      tags
    });

    this.formSubmited$ = this.actions.pipe(ofActionSuccessful(ImagesCreateRecordAction)).pipe(
      delay(200),
      tap(() => this.onClose())
    ).subscribe();

  }
    
  onClose() {
    this.matDialogRef.close();
  }

  formSubmit($event) {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new ImagesCreateRecordAction(this.formlyGroup.model));
  }

  ngOnDestroy() {
    this.formSubmited$.unsubscribe();
  }
   
  
  } 
