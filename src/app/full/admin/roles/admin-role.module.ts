import { NgModule } from '@angular/core';
import { getAdminComponents, getProviders } from './elements';
import { AdminRoleRoutingModule } from './admin-role.routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';

@NgModule({
    declarations: [
        ...getAdminComponents()
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CustomComponentsModule,
        SharedModule,
        FirebaseModule,
        MaterialComponentsModule,
        AdminRoleRoutingModule
    ],
    providers: [
        ...getProviders()
    ]
})
export class AdminRoleModule {}
