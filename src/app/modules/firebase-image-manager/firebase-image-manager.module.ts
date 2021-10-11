
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { NgxsModule } from '@ngxs/store';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { FirebaseImageManageComponent } from './firebase-image-manage/firebase-image-manage.component';
import { FirebaseImageUploaderDialogComponent } from './firebase-image-uploader-dialog/firebase-image-uploader-dialog.component';
import { FirebaseImageUploaderService } from './firebase-image-uploader-service/firebase-image-uploader.service';
import { FirebaseImageItemComponent } from './firebase-image-item/firebase-image-item.component';
import { FirebaseImageManageDialogComponent } from './firebase-image-manage-dialog/firebase-image-manage-dialog.component';
import { FirebaseImageManageDialogService } from './firebase-image-manage-dialog-service/firebase-image-manage-dialog.service';
import { CustomComponentsModule } from '../../components/components.module';
import { NgxFormlyFieldExtendedModule } from '../formly-fields-extended/ngx-formly-fields-extended.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    NgxFormlyFieldExtendedModule,
    CustomComponentsModule,
    NgxsModule,
    FirebaseImageModule
  ],
  declarations: [
    FirebaseImageManageComponent,
    FirebaseImageUploaderDialogComponent,
    FirebaseImageItemComponent,
    FirebaseImageManageDialogComponent
  ],
  exports: [
    FirebaseImageManageComponent,
    FirebaseImageUploaderDialogComponent,
    FirebaseImageItemComponent,
    FirebaseImageManageDialogComponent
  ],
  entryComponents: [
    FirebaseImageManageComponent,
    FirebaseImageUploaderDialogComponent,
    FirebaseImageManageDialogComponent
  ],
  providers: [
    FirebaseImageUploaderService,
    FirebaseImageManageDialogService
  ]
})
export class FirebaseImageManagerModule {
  static forRoot(): ModuleWithProviders<FirebaseImageManagerModule>{
    return {
      ngModule: FirebaseImageManagerModule,
      providers: [
        FirebaseImageUploaderService,
        FirebaseImageManageDialogService
      ]
    }
  }
}
