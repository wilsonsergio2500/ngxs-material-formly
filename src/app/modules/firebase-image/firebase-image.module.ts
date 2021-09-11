
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { FileUploadModule } from 'ng2-file-upload'
import { CustomComponentsModule } from '../../components/components.module';
import { FirebaseModule } from '../../firebase/firebase.module';
import { FirebaseImageUploaderComponent } from './firebase-image-uploader/firebase-image-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    FileUploadModule,
    CustomComponentsModule,
    FirebaseModule
  ],
  declarations: [
    FirebaseImageUploaderComponent
  ],
  exports: [
    FirebaseImageUploaderComponent
  ]
})
export class FirebaseImageModule {}
