import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from './types/toggle/toggle.module';
import { FormlyMatDatepickerModule } from './types/datepicker/datepicker.module';
import { FormlyFormFlexLayoutComponent } from './forms/formly-form-flex-layout/formly-form-flex-layout.component';
import { FormlyFormFlexJsonComponent } from './forms/formly-form-flex-json/fomly-form-flex-json.component'
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
//import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    FormlyFormFlexLayoutComponent,
    FormlyFormFlexJsonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    CustomComponentsModule,

    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyChipTypeModule,
    FormlyMatNumberInputModule,
    FormlyGroupFlexTypeModule,
    //FormlyMatInputTypeMaskModule,

    FomlySuffixIconWrapperModule,
    FomlyPrefixIconWrapperModule,
    FormlyImageResizeIoModule,
    FirebaseImageFormlyModule
    //TextMaskModule
  ],
  exports: [
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyFormFlexLayoutComponent,
    FormlyFormFlexJsonComponent,
    FormlyChipTypeModule,
    FormlyMatNumberInputModule,
    FormlyGroupFlexTypeModule,
    //FormlyMatInputTypeMaskModule,

    FomlySuffixIconWrapperModule,
    FomlyPrefixIconWrapperModule,
    FormlyImageResizeIoModule,
    FirebaseImageFormlyModule
  ]
})
export class NgxFormlyFieldExtendedModule { }
