import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { SharedModule } from '../../shared.module';
import { ImageResizerModule } from '../image-resizer-io/image-resizer-io.module';
import { MediaManageComponent } from './media-manage/media-manage.component';
import { MediaImageDialogComponent } from './media-image-dialog/media-image-dialog.component'
import { NgxsModule } from '@ngxs/store';
import { MediaImageItemComponent } from './media-image-item/media-image-item.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        SharedModule,
        NgxsModule,
        ImageResizerModule
    ],
    declarations: [
        MediaManageComponent,
        MediaImageItemComponent,
        MediaImageDialogComponent
    ],
    exports: [
        ImageResizerModule,
        MediaManageComponent,
        MediaImageItemComponent,
        MediaImageDialogComponent
    ],
    entryComponents: [
        MediaImageDialogComponent
    ]
})
export class MediaModule {
}
