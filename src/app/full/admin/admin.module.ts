import { NgModule } from '@angular/core';
import { getAdminViewComponents } from './elements';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared.module';
import { FirebaseModule } from '../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { AdminRoutingModule } from './admin.routing.module';
import { NgxsModule } from '@ngxs/store';
import { getAdminStates } from './xs-ng/states'

@NgModule({
    declarations: [
        ...getAdminViewComponents()
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CustomComponentsModule,
        SharedModule,
        FirebaseModule,
        MaterialComponentsModule,
        AdminRoutingModule,
        NgxsModule.forFeature([...getAdminStates()])
    ]
})
export class AdminModule {
}
