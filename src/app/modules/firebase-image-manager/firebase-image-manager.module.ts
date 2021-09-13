
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { SharedModule } from '../../shared.module';
import { NgxsModule } from '@ngxs/store';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { FirebaseImageManageComponent } from './firebase-image-manage/firebase-image-manage.component';
import { FirebaseImageUploaderDialogComponent } from './firebase-image-uploader-dialog/firebase-image-uploader-dialog.component';
import { FirebaseImageUploaderService } from './firebase-image-uploader-service/firebase-image-uploader.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    SharedModule,
    NgxsModule,
    FirebaseImageModule
  ],
  declarations: [
    FirebaseImageManageComponent,
    FirebaseImageUploaderDialogComponent
  ],
  exports: [
    FirebaseImageManageComponent,
    FirebaseImageUploaderDialogComponent
  ],
  entryComponents: [
    FirebaseImageManageComponent,
    FirebaseImageUploaderDialogComponent
  ],
  providers: [
    FirebaseImageUploaderService
  ]
})
export class FirebaseImageManagerModule {
  static forRoot(): ModuleWithProviders<FirebaseImageManagerModule>{
    return {
      ngModule: FirebaseImageManagerModule,
      providers: [
        FirebaseImageUploaderService
      ]
    }
  }
}
