import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldNumberInput } from './number.component';


@NgModule({
  declarations: [FormlyFieldNumberInput],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,

    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'input-number',
          component: FormlyFieldNumberInput,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyMatNumberInputModule { }
