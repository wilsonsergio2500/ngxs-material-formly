import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../../components/components.module';
import { SharedModule } from '../../../shared.module';
import { FirebaseModule } from '../../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../../materialcomponents.module';
import { AdminMediaRoutingModule } from './admin-media.routing.module';
import { ImageResizerModule } from '../../../modules/image-resizer-io/image-resizer-io.module';
import { getAdminMediaComponents } from './elements';


@NgModule({
    declarations: [
        ...getAdminMediaComponents()
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CustomComponentsModule,
        SharedModule,
        FirebaseModule,
        MaterialComponentsModule,
        AdminMediaRoutingModule,
        ImageResizerModule
    ],
    providers: [
    ]
})
export class AdminMediaModule {
}
