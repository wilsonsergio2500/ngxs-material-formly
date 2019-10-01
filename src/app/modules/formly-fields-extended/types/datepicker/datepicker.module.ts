import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MaterialComponentsModule } from '../../../../materialcomponents.module';

import { FormlyDatepickerTypeComponent } from './datepicker.type';

@NgModule({
  declarations: [FormlyDatepickerTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [{
        name: 'datepicker',
        component: FormlyDatepickerTypeComponent,
        wrappers: ['form-field'],
        defaultOptions: {
          templateOptions: {
            datepickerOptions: {
              startView: 'month',
            },
          },
        },
      }],
    }),
  ],
})
export class FormlyMatDatepickerModule { }
