import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { SuffixIconWrapperComponent } from './suffix-icon.component';

@NgModule({
  declarations: [SuffixIconWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      wrappers: [
        { name: 'suffix', component: SuffixIconWrapperComponent}
      ]
    }),
  ],
})
export class FomlySuffixIconWrapperModule { }
