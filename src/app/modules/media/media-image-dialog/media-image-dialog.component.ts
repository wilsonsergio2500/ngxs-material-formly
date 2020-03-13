import { Component, AfterContentInit, OnInit } from '@angular/core';
import { FormlyTypeGroup } from '../../formly-fields-extended/base/FormlyTypeGroup';
import { IMediaImagePost } from './media-image.contract';
import { FieldTypes } from '../../formly-fields-extended/base/fields-types-schemas';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'media-image-dialog',
    templateUrl: 'media-image-dialog.component.html',
    styleUrls: [`media-image-dialog.component.scss`]
  })
  export class MediaImageDialogComponent implements OnInit {

    btnReadyLabel = 'Upload';
    btnLoadingLabel = 'Uploading..';
    formlyGroup: FormlyTypeGroup<IMediaImagePost>

    constructor(private matDialogRef: MatDialogRef<MediaImageDialogComponent>) {
    }

    ngOnInit() {

        const tags = new FieldTypes.ChipField('Tags', 'Enter tags', true);
        const image = new FieldTypes.ImageResizeIoUploader('Upload', true, 100, { previewFlexSize: 25 });
        image.className = 'upload-form-item';
        this.formlyGroup = new FormlyTypeGroup<IMediaImagePost>({
            image,
            tags
        });
    }

    formSubmit($event) {
        console.log(this.formlyGroup.model);
        //console.log($event);
    }

    close() {
        this.matDialogRef.close();   
    }
  
  } 
