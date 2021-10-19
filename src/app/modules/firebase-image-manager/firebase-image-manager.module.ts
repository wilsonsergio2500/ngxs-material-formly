import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { NgxsModule } from '@ngxs/store';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { FirebaseImageManageComponent } from './firebase-image-manage/firebase-image-manage.component';
import { FirebaseImageItemComponent } from './firebase-image-item/firebase-image-item.component';
import { FirebaseImageManageDialogComponent } from './firebase-image-manage-dialog/firebase-image-manage-dialog.component';
import { FirebaseImageManageDialogService } from './firebase-image-manage-dialog-service/firebase-image-manage-dialog.service';
import { CustomComponentsModule } from '../../components/components.module';
import { FirebaseImageManageGalleryUploaderComponent } from './firebase-image-manage-gallery-uploader/firebase-image-manage-gallery-uploader.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    CustomComponentsModule,
    NgxsModule,
    FirebaseImageModule
  ],
  declarations: [
    FirebaseImageManageComponent,
    FirebaseImageItemComponent,
    FirebaseImageManageDialogComponent,
    FirebaseImageManageGalleryUploaderComponent
  ],
  exports: [
    FirebaseImageManageComponent,
    FirebaseImageItemComponent,
    FirebaseImageManageDialogComponent,
    FirebaseImageManageGalleryUploaderComponent
  ],
  entryComponents: [
    FirebaseImageManageComponent,
    FirebaseImageManageDialogComponent
  ],
  providers: [
    FirebaseImageManageDialogService
  ]
})
export class FirebaseImageManagerModule {
  static forRoot(): ModuleWithProviders<FirebaseImageManagerModule>{
    return {
      ngModule: FirebaseImageManagerModule,
      providers: [
        FirebaseImageManageDialogService
      ]
    }
  }
}
