import { Component } from '@angular/core';
import { FormlyForm } from '@ngx-formly/core';

@Component({
    selector: 'formly-form-flex',
    template: `
    <div
      fxLayout="row wrap"
      class="content" 
      fxLayout.xs="column"
      fxFlexFill>
      <formly-field *ngFor="let field of fields"
        [fxFlex]="field.templateOptions.fxFlex"
        [fxFlex.xs]="field.templateOptions.fxFlexXs"
        [fxHide.xs]="field.templateOptions.fxHideXs"
        [field]="field"
        [ngClass]="field.className"
        [ngStyle]="{'padding.px': 10}">
      </formly-field>
    </div>
    <ng-container #content>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class FormlyFormFlexLayoutComponent extends FormlyForm {}
