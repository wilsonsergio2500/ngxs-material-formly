import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FormTypeBuilder } from "./form-type-builder.service";
import { getModuleComponents } from './components/elements';
import { getModuleDirectives } from './directives/elements';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { FormControlItemDirective } from './directives/form-control-item/form-control-item.directive'

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  declarations: [
    ...getModuleComponents(),
    ...getModuleDirectives()
  ],
  exports: [
    ...getModuleComponents(),
    ...getModuleDirectives()
  ],
   providers: [FormTypeBuilder],
})
export class FormTypeBuilderModule { }
