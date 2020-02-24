import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from 'ng2-file-upload';
import { FormlyImageResizeIoUploaderTypeComponent } from './image-rio-uploader.component';
import { IImageResizeIoUploaderOptions } from './contracts/image-rio-uploader-options';
import { ISizeDimensions } from '../../../image-resizer-io/config/contracts/dimensions';
import { CustomComponentsModule } from '../../../../components/components.module';
import { ImageResizerModule } from '../../../image-resizer-io/image-resizer-io.module';


@NgModule({
    declarations: [
        FormlyImageResizeIoUploaderTypeComponent
    ],
    imports: [
        CommonModule,
        ImageResizerModule,
        CustomComponentsModule,
        ReactiveFormsModule,
        MatInputModule,
        FormlyMatFormFieldModule,
        FileUploadModule,
        FormlyModule.forChild({
            types: [{
                name: 'image-resize-io-uploader',
                component: FormlyImageResizeIoUploaderTypeComponent,
                //wrappers: ['form-field'],
                defaultOptions: {
                    templateOptions: {
                        fileResizeIoUploader: <IImageResizeIoUploaderOptions>{
                            previewFlexSize: 100,
                            thumbnailMissingImageUrl: 'https://im.ages.io/dSaintlp',
                            thumbnailDimensions: <ISizeDimensions>{ width: 300, height: 200 },
                            thumbnailAspectRatio: <ISizeDimensions>{ width: 2, height: 1 },
                            viewerPreserveAspectRatio: false
                        }

                    },
                },
            }],
        }),
    ],

})
export class FormlyImageResizeIoModule {

}
