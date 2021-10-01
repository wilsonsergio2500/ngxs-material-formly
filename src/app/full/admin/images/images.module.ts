
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesRoutingModule } from './images.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';
import { getImageModuleComponents } from './elements';
import { FirebaseImageModule } from '@firebase-image/firebase-image.module';
import { FirebaseImageManagerModule } from '../../../modules/firebase-image-manager/firebase-image-manager.module';
import { ImagesMangerResolver } from './images-manager/images-manager.resolver';

@NgModule({
  declarations: [
    ...getImageModuleComponents()
  ],
  providers: [
    ImagesMangerResolver
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FlexLayoutModule,
    CustomComponentsModule,
    SharedModule,
    FirebaseModule,
    MaterialComponentsModule,
    FirebaseImageModule,
    FirebaseImageManagerModule.forRoot()
  ]
})
export class ImagesModule { }
