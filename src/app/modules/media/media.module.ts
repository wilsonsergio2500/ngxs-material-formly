import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { MediaManageDialogService } from './media-manage-dialog-service/media-manage-dialog.service';
import { MediaManageDialogComponent } from './media-manage-dialog/media-manage-dialog.component';

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
    MediaImageDialogComponent,
    MediaManageDialogComponent
  ],
  providers: [
    MediaManageDialogService
  ],
  exports: [
    ImageResizerModule,
    MediaManageComponent,
    MediaImageItemComponent,
    MediaImageDialogComponent,
    MediaManageDialogComponent
  ],
  entryComponents: [
    MediaImageDialogComponent,
    MediaManageDialogComponent
  ]
})
export class MediaModule {
  static forRoot(): ModuleWithProviders<MediaModule> {
    return {
      ngModule: MediaModule,
      providers: [
        MediaManageDialogService
      ]
    }
  }
}
