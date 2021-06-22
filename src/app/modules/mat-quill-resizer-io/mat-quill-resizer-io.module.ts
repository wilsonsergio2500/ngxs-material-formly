
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill'
import { MatQuillModule } from '../mat-quill/mat-quill.module';
import { ImageResizerModule } from '../image-resizer-io/image-resizer-io.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { CustomComponentsModule } from '../../components/components.module';
import { MatQuillImgResizer } from './components/mat-quill-resizer-io.component';


@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    MatQuillModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    CustomComponentsModule,
    ImageResizerModule
  ],
  declarations: [MatQuillImgResizer],
  exports: [MatQuillImgResizer]
})
export class MatQuillResizerIoModule { }
