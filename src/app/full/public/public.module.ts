import { NgModule } from '@angular/core';
import { getPublicComponents, getPublicProviders } from './elements';
import { PublicRoutingModule } from './public.routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared.module';
import { FirebaseModule } from '../../firebase/firebase.module';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { NgDompurifyModule } from '../../modules/ng-dompurify/ng-dompurify.module';

@NgModule({
    declarations: [...getPublicComponents()],
    providers: [...getPublicProviders()],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CustomComponentsModule,
        SharedModule,
        FirebaseModule,
        MaterialComponentsModule,
        PublicRoutingModule,
        NgDompurifyModule
    ]
})
export class PublicModule { }
