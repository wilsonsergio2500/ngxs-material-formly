import { NgModule } from '@angular/core';
import { getAdminPagesComponents, getAdminPagesProviders } from './elements';
import { AdminPageRoutingModule } from './admin-page.routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';

@NgModule({
    declarations: [
        ...getAdminPagesComponents()
    ],
    providers: [
        ...getAdminPagesProviders()
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CustomComponentsModule,
        SharedModule,
        FirebaseModule,
        MaterialComponentsModule,
        AdminPageRoutingModule
    ],

})
export class AdminPageModule {}
