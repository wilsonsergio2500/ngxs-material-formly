
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';
import { AdminPostRoutingModule } from './admin-post.routing.module'

import { getAdminComponents, getAdminProviders } from './elements';

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
        AdminPostRoutingModule
    ],
    providers: [
        ...getAdminProviders()
    ]
})
export class AdminPostModule {
}
