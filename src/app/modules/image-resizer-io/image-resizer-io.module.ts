import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { FileUploadModule } from 'ng2-file-upload'
import { ImageRioViewerComponent } from './viewer/image-rio-viewer.component';
import { ImageRioUploaderComponent } from './uploader/image-rio-uploader.component';
import { CustomComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        FileUploadModule,
        CustomComponentsModule
    ],
    declarations: [
        ImageRioViewerComponent,
        ImageRioUploaderComponent
    ],
    exports: [
        FileUploadModule,
        ImageRioViewerComponent,
        ImageRioUploaderComponent
    ]
})
export class ImageResizerModule {
}
