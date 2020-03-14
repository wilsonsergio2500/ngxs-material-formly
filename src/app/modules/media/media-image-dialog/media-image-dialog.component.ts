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
        const tagsMaxSize = 5
        const maxSize = {
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

        const tags = new FieldTypes.ChipField('Tags', 'Enter tags', true, 100, { validators: { maxSize } });
        const image = new FieldTypes.ImageResizeIoUploader('Upload', true, 100, { previewFlexSize: 25 }, { className: 'upload-form-item'});
       
        this.formlyGroup = new FormlyTypeGroup<IMediaImagePost>({
            image,
            tags
        });
    }

    formSubmit($event) {
        console.log(this.formlyGroup.model);
    }

    close() {
        this.matDialogRef.close();   
    }
  
  } 
