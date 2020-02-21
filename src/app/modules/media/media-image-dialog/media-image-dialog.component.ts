import { Component, AfterContentInit, OnInit } from '@angular/core';
import { FormlyTypeGroup } from '../../formly-fields-extended/base/FormlyTypeGroup';
import { IMediaImagePost } from './media-image.contract';
import { FieldTypes } from '../../formly-fields-extended/base/fields-types-schemas';

@Component({
    selector: 'media-image-dialog',
    templateUrl: 'media-image-dialog.component.html',
    styleUrls: [`media-image-dialog.component.scss`]
  })
  export class MediaImageDialogComponent implements OnInit {

    formlyGroup: FormlyTypeGroup<IMediaImagePost>

    constructor() {
    }

    ngOnInit() {

        const name = new FieldTypes.InputField('Name', true);
        const tags = new FieldTypes.ChipField('Tags', 'Enter tags', true);
        this.formlyGroup = new FormlyTypeGroup<IMediaImagePost>({
            name,
            tags
        });
    }
  
  } 
