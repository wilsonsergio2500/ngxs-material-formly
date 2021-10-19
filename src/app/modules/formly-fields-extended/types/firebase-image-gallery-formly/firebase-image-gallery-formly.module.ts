import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FileUploadModule } from 'ng2-file-upload';
import { CustomComponentsModule } from '../../../../components/components.module';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { FirebaseImageManagerModule } from '../../../firebase-image-manager/firebase-image-manager.module';
import { FirebaseImageGalleryFormlyComponent } from './firebase-image-gallery-formly.component';

export interface IFirebaseImageGalleryFormlyTemplateOptions {
  bucket: string;
}

@NgModule({
  declarations: [
    FirebaseImageGalleryFormlyComponent
  ],
  imports: [
    CommonModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    FormlyMatFormFieldModule,
    FileUploadModule,
    FirebaseImageModule,
    FirebaseImageManagerModule,
    FormlyModule.forChild({
      types: [{
        name: 'firebase-imaga-gallery-uploader',
        component: FirebaseImageGalleryFormlyComponent,
        defaultOptions: {
          templateOptions: {
            firebaseImageGalleryFormlyConfig: <IFirebaseImageGalleryFormlyTemplateOptions>{
              bucket: 'pages'
            }
          }
        },
      }],
    }),
  ],

})
export class FormlyFirebaseImageGalleryModule { }
