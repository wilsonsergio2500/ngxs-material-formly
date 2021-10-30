import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from './types/toggle/toggle.module';
import { FormlyMatDatepickerModule } from './types/datepicker/datepicker.module';
import { FormlyChipTypeModule } from './types/ngx-chip/chip.module';
import { FormlyMatNumberInputModule } from './types/number/number.module';

import { FormlyGroupFlexTypeModule } from './types/flex-group/flex-group.module';
//import { FormlyMatInputTypeMaskModule } from './types/input-mask/input-mask.module';

import { MaterialComponentsModule } from '../../materialcomponents.module';

//wrappers
import { FomlySuffixIconWrapperModule } from './wrappers/suffix/suffix-icon.module';
import { FomlyPrefixIconWrapperModule } from './wrappers/prefix/prefix-icon.module';

import { CustomComponentsModule } from '../../components/components.module';
import { FormlyImageResizeIoModule } from './types/image-resize-io-upload/image-rio-uploader.module';
import { FirebaseImageFormlyModule } from './types/firebase-image-formly/firebase-image-formly.module';
import { FormlyMatEditorModule } from './types/mat-editor-formly/mat-editor-formly.module';
import { FormlyFormsFlexModule } from './formly-form-flex/formly-form-flex.module';
import { FormlyFirebaseImageGalleryModule } from './types/firebase-image-gallery-formly/firebase-image-gallery-formly.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    CustomComponentsModule,

    FormlyModule.forRoot(),
    FormlyFormsFlexModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyChipTypeModule,
    FormlyMatNumberInputModule,
    FormlyGroupFlexTypeModule,
    FormlyMatEditorModule,
    //FormlyMatInputTypeMaskModule,

    FomlySuffixIconWrapperModule,
    FomlyPrefixIconWrapperModule,
    FormlyImageResizeIoModule,
    FirebaseImageFormlyModule,
    //TextMaskModule
    FormlyFirebaseImageGalleryModule
  ],
  exports: [
    FormlyModule,
    FormlyFormsFlexModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    //FormlyFormFlexLayoutComponent,
    //FormlyFormFlexJsonComponent,
    FormlyChipTypeModule,
    FormlyMatNumberInputModule,
    FormlyGroupFlexTypeModule,
    FormlyMatEditorModule,
    //FormlyMatInputTypeMaskModule,

    FomlySuffixIconWrapperModule,
    FomlyPrefixIconWrapperModule,
    FormlyImageResizeIoModule,
    FirebaseImageFormlyModule,
    FormlyFirebaseImageGalleryModule
  ]
})
export class NgxFormlyFieldExtendedModule { }
