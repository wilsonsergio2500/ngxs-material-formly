import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from 'ng2-file-upload';
import { CustomComponentsModule } from '../../../../components/components.module';
import { FirebaseImageFormlyComponent } from './firebase-image-formly.component';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';

export interface IFirebaseImageFormlyTemplateOptions {
  bucket: string;
}

@NgModule({
  declarations: [
    FirebaseImageFormlyComponent
  ],
  imports: [
    CommonModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormlyMatFormFieldModule,
    FileUploadModule,
    FirebaseImageModule,
    FormlyModule.forChild({
      types: [{
        name: 'firebase-image-uploader',
        component: FirebaseImageFormlyComponent,
        //wrappers: ['form-field'],
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

})
export class FirebaseImageFormlyModule {}
