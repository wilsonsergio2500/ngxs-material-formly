
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

@NgModule({
  declarations:[
      ...getImageModuleComponents()
    ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FlexLayoutModule,
    CustomComponentsModule,
    SharedModule,
    FirebaseModule,
    MaterialComponentsModule,
    FirebaseImageModule
  ]
})
export class ImagesModule { }
