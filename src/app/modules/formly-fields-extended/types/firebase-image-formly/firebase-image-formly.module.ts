import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialComponentsModule } from '../../../../materialcomponents.module';
import { NgxsModule } from '@ngxs/store';
import { CustomComponentsModule } from '../../../../components/components.module';
import { FirebaseImageFormlyComponent } from './firebase-image-formly.component';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { FirebaseImageUploaderDialogComponent } from './firebase-image-uploader-dialog/firebase-image-uploader-dialog.component';
import { FirebaseImageUploaderService } from './firebase-image-uploader-service/firebase-image-uploader.service';
import { FormlyFormsFlexModule } from '../../formly-form-flex/formly-form-flex.module';

export interface IFirebaseImageFormlyTemplateOptions {
  bucket: string;
}

@NgModule({
  declarations: [
    FirebaseImageFormlyComponent,
    FirebaseImageUploaderDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomComponentsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormlyMatFormFieldModule,
    FormlyFormsFlexModule,
    FileUploadModule,
    FirebaseImageModule,
    NgxsModule,
    FormlyModule.forChild({
      types: [{
        name: 'firebase-image-uploader',
        component: FirebaseImageFormlyComponent,
        defaultOptions: {
          templateOptions: {
            firebaseImageFormlyconfig: <IFirebaseImageFormlyTemplateOptions>{
                bucket: 'pages'
            }

          },
        },
      }],
    }),
  ],
  entryComponents: [
    FirebaseImageUploaderDialogComponent
  ],
  providers: [
    FirebaseImageUploaderService
  ]
})
export class FirebaseImageFormlyModule {}
