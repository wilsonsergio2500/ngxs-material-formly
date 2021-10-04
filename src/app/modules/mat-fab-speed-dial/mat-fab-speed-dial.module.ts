
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { MatFabSpeedDialComponent } from './mat-fab-speed-dial.component';
import { MatFabSpeedDialActionsComponent } from './mat-fab-speed-dial-actions/mat-fab-speed-dial-actions.component';
import { MatFabSpeedDialTriggerComponent } from './mat-fab-speed-dial-trigger/mat-fab-speed-dial-trigger.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
  ],
  declarations: [
    MatFabSpeedDialComponent,
    MatFabSpeedDialTriggerComponent,
    MatFabSpeedDialActionsComponent
  ],
  exports: [
    MatFabSpeedDialComponent,
    MatFabSpeedDialTriggerComponent,
    MatFabSpeedDialActionsComponent
  ]
})
export class MatFabSpeedDialModule { }
