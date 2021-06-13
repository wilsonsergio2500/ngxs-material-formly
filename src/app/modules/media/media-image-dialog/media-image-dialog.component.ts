import { Component,  OnInit, OnDestroy } from '@angular/core';
import { FormlyTypeGroup } from '../../formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '../../formly-fields-extended/base/fields-types-schemas';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { IImageResizerFirebaseModel } from '../../../schemas/images/image-resizer.model';
import { ImagesOnResizerCreateAction } from '../../../states/media/images-on-resizer/images-on-resizer.actions';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
    selector: 'media-image-dialog',
    templateUrl: 'media-image-dialog.component.html',
    styleUrls: [`media-image-dialog.component.scss`]
  })
  export class MediaImageDialogComponent implements OnInit, OnDestroy {

    btnReadyLabel = 'Upload';
    btnLoadingLabel = 'Uploading..';
    formlyGroup: FormlyTypeGroup<IImageResizerFirebaseModel>;
    formSubmitted$: Subscription

    constructor(
        private store: Store,
        private actions: Actions,
        private matDialogRef: MatDialogRef<MediaImageDialogComponent>
    ) {
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
        const imageUrl = new FieldTypes.ImageResizeIoUploader('Upload', true, 100, { previewFlexSize: 25 }, { className: 'upload-form-item'});
       
        this.formlyGroup = new FormlyTypeGroup<IImageResizerFirebaseModel>({
            imageUrl,
            tags
        });

        this.formSubmitted$ = this.actions.pipe(ofActionSuccessful(ImagesOnResizerCreateAction)).pipe(
            delay(250),
            tap(_ => this.onFormSubmitted())
        ).subscribe();

    }

    onFormSubmitted() {
        this.close();
    }

    formSubmit($event) {
        this.formlyGroup.markAsBusy();
        this.store.dispatch(new ImagesOnResizerCreateAction(this.formlyGroup.model))
    }

    close() {
        this.matDialogRef.close();   
    }

    ngOnDestroy() {
        if (this.formSubmitted$) {
            this.formSubmitted$.unsubscribe();
        }
    }
  
  } 
