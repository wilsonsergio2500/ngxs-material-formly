
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../materialcomponents.module';

import { getCustomUiElements, getCustomUiElementsEntryComponents, getCustomUiElementsProviders } from './ui-elements/elements';
import { getCustomFormElements } from './form-elements/elements';

@NgModule({
  declarations: [
    ...getCustomUiElements(),
    ...getCustomFormElements()
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
      MaterialComponentsModule,
    
  ],
  exports: [
    ...getCustomUiElements(),
    ...getCustomFormElements()
  ],
  providers: [
    ...getCustomUiElementsProviders()
  ],
  entryComponents: [
    ...getCustomUiElementsEntryComponents(),
  ]
})
export class CustomComponentsModule {

}
