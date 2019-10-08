
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared.module';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { MainViewRoutingModule } from './main.routing.module';
import { FirebaseModule } from '../../firebase/firebase.module'
import { getMainViewComponents } from './elements';


@NgModule({
  declarations: [
    ...getMainViewComponents()
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomComponentsModule,
    SharedModule,
    FirebaseModule,
    MaterialComponentsModule,
    MainViewRoutingModule
  ]
})
export class MainViewModule {
}
