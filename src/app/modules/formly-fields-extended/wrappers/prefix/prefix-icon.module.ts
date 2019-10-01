import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { PrefixIconWrapperComponent } from './prefix-icon.component';

@NgModule({
  declarations: [PrefixIconWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      wrappers: [
        { name: 'prefix', component: PrefixIconWrapperComponent}
      ]
    }),
  ],
})
export class FomlyPrefixIconWrapperModule { }
