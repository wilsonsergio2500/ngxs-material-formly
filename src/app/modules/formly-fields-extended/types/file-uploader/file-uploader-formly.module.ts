//import { NgModule } from '@angular/core';
//import { CustomComponentsModule } from '../../../../components/components.module';
//import { CommonModule } from '@angular/common';
//import { ReactiveFormsModule } from '@angular/forms';
//import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
//import { FormlyModule } from '@ngx-formly/core';
//import { MaterialComponentsModule } from '../../../../materialcomponents.module';
//import { FormlyFileUploaderComponent } from './file-uploader-formly.component';
//import { IFileUploaderOptions } from './contracts/file-uploader-formly.options';

///*
// * usage:
// *  new FieldTypes.FileUploader(false, 100, { placeholder: 'Upload Document'}))
// */

//@NgModule({
//  declarations: [FormlyFileUploaderComponent],
//  imports: [
//    CustomComponentsModule,
//    CommonModule,
//    ReactiveFormsModule,
//    MaterialComponentsModule,
//    FormlyMatFormFieldModule,
//    FormlyModule.forChild({
//      types: [{
//        name: 'formly-file-uploader',
//        component: FormlyFileUploaderComponent,
//        wrappers: ['form-field'],
//        defaultOptions: {
//          templateOptions: {
//            fileUploder: <IFileUploaderOptions>{
//              placeholder: 'Upload Document',
//              placeholderWhenWorking: 'Loading...',
//              icon: 'file_copy',
//              processAsBase64: false,
//              allowedMimeType: [
//                'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
//                'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//                'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//                'application/pdf'
//              ]
//            },
//          },
//        },
//      }],
//    }),
//  ],

//})
//export class FormlyFileUploaderTypeModule { }
