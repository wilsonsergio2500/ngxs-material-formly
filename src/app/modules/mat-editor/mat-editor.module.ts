import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatEditorComponent } from './mat-editor.component';
import { MatFabSpeedDialModule } from '../mat-fab-speed-dial/mat-fab-speed-dial.module';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { FirebaseImageModule } from '../firebase-image/firebase-image.module';
import { FirebaseImageManagerModule } from '../firebase-image-manager/firebase-image-manager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    QuillModule,
    MatFabSpeedDialModule,
    FirebaseImageModule,
    FirebaseImageManagerModule
  ],
  declarations: [
    MatEditorComponent
  ],
  exports: [
    MatEditorComponent
  ]
})
export class MatEditorModule {}
