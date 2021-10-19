import { FormlyChipTypeComponent } from './chips.component';
import { NgModule } from '@angular/core';
import { CustomComponentsModule } from '../../../../components/components.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete'

@NgModule({
  declarations: [FormlyChipTypeComponent],
  imports: [
    CustomComponentsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [{
        name: 'formly-chips',
        component: FormlyChipTypeComponent,
        defaultOptions: {
        },
      }],
    }),
  ],

})
export class FormlyChipTypeModule { }
