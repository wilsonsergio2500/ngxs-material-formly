import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { QuillModule } from 'ngx-quill'
/*import { ImageResize } from './extensions/ImageResize/imageResize'*/
import { MatQuill } from './mat-quill'

@NgModule({
  declarations: [MatQuill],
  exports: [MatQuill],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatFormFieldModule
  ]
})
export class MatQuillModule { }
