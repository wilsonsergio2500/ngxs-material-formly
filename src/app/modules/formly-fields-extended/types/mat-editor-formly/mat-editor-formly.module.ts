import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';
import { CustomComponentsModule } from '../../../../components/components.module';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { MatEditorFormlyComponent } from './mat-editor-formly.component';
import { MatFabSpeedDialModule } from '../../../mat-fab-speed-dial/mat-fab-speed-dial.module';
import { FirebaseImageManagerModule } from '../../../firebase-image-manager/firebase-image-manager.module';
import { MatEditorModule } from '../../../mat-editor/mat-editor.module';

export interface IMatEditorFormlyTemplateOptions {
  modules: any;
  hasSideBar: boolean;
  placeholder: string;
}

@NgModule({
  declarations: [
    MatEditorFormlyComponent
  ],
  imports: [
    CommonModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    QuillModule,
    FormlyMatFormFieldModule,
    FileUploadModule,
    MatFabSpeedDialModule,
    MatEditorModule,
    FirebaseImageModule,
    FirebaseImageManagerModule,
    FormlyModule.forChild({
      types: [{
        name: 'mat-editor-formly',
        component: MatEditorFormlyComponent,
        defaultOptions: {
          templateOptions: {
            matEditorFormlyConfig: <IMatEditorFormlyTemplateOptions>{
              placeholder: 'Insert text here...',
              modules : {
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline'],
                ],
                'imageResize': {}
              },
              hasSideBar: true
            }

          },
        },
      }],
    }),
  ],

})
export class FormlyMatEditorModule { }
