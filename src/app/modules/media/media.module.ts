import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { SharedModule } from '../../shared.module';
import { MediaManageComponent } from './media-manage/media-manage.component';
import { ImageResizerModule } from '../image-resizer-io/image-resizer-io.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        SharedModule,
        ImageResizerModule
    ],
    declarations: [
        ImageResizerModule,
        MediaManageComponent
    ],
    exports: [
        ImageResizerModule,
        MediaManageComponent
    ]
})
export class MediaModule {
}
