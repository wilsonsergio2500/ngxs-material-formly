import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialComponentsModule } from './materialcomponents.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTypeBuilderModule } from './modules/form-type-builder/form-type.builder.module';
import { CustomComponentsModule } from './components/components.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxFormlyFieldExtendedModule } from './modules/formly-fields-extended/ngx-formly-fields-extended.module';
//import { VirtualScrollerModule } from 'ngx-virtual-scroller';
//import { TextMaskModule } from 'angular2-text-mask';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WebWorkerModule } from './modules/web-worker/web-worker.module';
import { FirebaseModule } from './firebase/firebase.module';
import { QuillModule } from 'ngx-quill';
import { MatQuillModule } from './modules/mat-quill/mat-quill.module';
import { MatFabSpeedDialModule } from './modules/mat-fab-speed-dial/mat-fab-speed-dial.module';
import { MatEditorModule } from './modules/mat-editor/mat-editor.module';
import { FirebaseImageModule } from './modules/firebase-image/firebase-image.module';
import { FirebaseImageManagerModule } from './modules/firebase-image-manager/firebase-image-manager.module';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormTypeBuilderModule,
    NgxsModule,
    NgxsRouterPluginModule,
    FirebaseModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFormlyFieldExtendedModule,
    //VirtualScrollerModule,
    //TextMaskModule,
    ScrollingModule,
    WebWorkerModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      //customModules: [{
      //  implementation: Counter,
      //  path: 'modules/counter'
      //}],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    MatQuillModule,
    MatEditorModule,
    MatFabSpeedDialModule,
    FirebaseImageModule,
    FirebaseImageManagerModule.forRoot()
  ],
  declarations: [
    SafeHtmlPipe
  ],
  //providers: [
  //],
  exports: [
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
      FormTypeBuilderModule,
      FirebaseModule,
    //Ng2UiAuthModule,
    CustomComponentsModule,
    NgxFormlyFieldExtendedModule,
    //VirtualScrollerModule,
    //TextMaskModule,
    ScrollingModule,
    WebWorkerModule,
    QuillModule,
    MatQuillModule,
    MatEditorModule,
    MatFabSpeedDialModule,
    FirebaseImageModule,
    FirebaseImageManagerModule,
    SafeHtmlPipe

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      //providers: [...getSharedResolvers()]
    }
  }
}
