import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { IImageFirebaseModel } from '@firebase-schemas/images/image.model';

@Component({
    selector: 'firebase-image-uploader-dialog',
    templateUrl: 'firebase-image-uploader-dialog.component.html',
    styleUrls: [`firebase-image-uploader-dialog.component.scss`]
  })
  export class FirebaseImageUploaderDialogComponent implements OnInit {

  btnReadyLabel = 'Save';
  btnLoadingLabel = 'Saving..';
  formlyGroup: FormlyTypeGroup<IImageFirebaseModel>;

  constructor(
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
    const imageUrl = new FieldTypes.FirebaseImageUploader('Upload', true, 30, { bucket: 'pages' }, { className: 'firebase-image-uploader' });

    this.formlyGroup = new FormlyTypeGroup<IImageFirebaseModel>({
      imageUrl,
      tags
    });

  }
    
  onClose() {
    this.matDialogRef.close();
  }

  formSubmit($event) {
    this.formlyGroup.markAsBusy();
    /*this.store.dispatch(new ImagesOnResizerCreateAction(this.formlyGroup.model))*/
  }
   
  
  } 
