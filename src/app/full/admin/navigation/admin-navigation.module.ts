
import { NgModule } from '@angular/core';
import { AdminNavigationBuilderRoutingModule } from './admin-nagivation.routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';
import { AdminNavigationListComponent } from './list/admin-navigation-list.component';
import { AdminNavigationComponent } from './admin-navigation.component';

@NgModule({
    declarations: [
        AdminNavigationComponent,
        AdminNavigationListComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CustomComponentsModule,
        SharedModule,
        FirebaseModule,
        MaterialComponentsModule,
        AdminNavigationBuilderRoutingModule
    ]
})
export class AdminNavigationBuilderModule {}
