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
    //Ng2UiAuthModule.forRoot(<IPartialConfigOptions>{ loginUrl: `${environment.api.target}userlogin/login` }),
    CustomComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFormlyFieldExtendedModule,
    //VirtualScrollerModule,
    //TextMaskModule,
    ScrollingModule,
    WebWorkerModule
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
    WebWorkerModule

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      //providers: [...getSharedResolvers()]
    }
  }
}
