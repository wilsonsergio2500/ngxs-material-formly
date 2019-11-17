import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormlyForm } from '@ngx-formly/core';

@Component({
    selector: 'formly-form-flex',
    //template: `
    //  <div
    //    fxLayout="row wrap"
    //    class="content" 
    //    fxLayout.xs="column"
    //    fxFlexFill>
    //    <formly-field *ngFor="let field of fields"
    //      [fxFlex]="field.templateOptions.fxFlex"
    //      [fxFlex.xs]="100"
    //      [fxHide.xs]="field.templateOptions.fxHideXs"
    //      [form]="field.form"
    //      [field]="field"
    //      [model]="field.model"
    //      [ngClass]="field.className"
    //      [ngStyle]="{'padding.px': 10}"
    //      [options]="options">
    //    </formly-field>
    //  </div>

    //  <ng-content></ng-content>
    //`,
    template: `
    <div
      fxLayout="row wrap"
      class="content" 
      fxLayout.xs="column"
      fxFlexFill>
      <formly-field *ngFor="let field of fields"
        [fxFlex]="field.templateOptions.fxFlex"
        [fxFlex.xs]="100"
        [fxHide.xs]="field.templateOptions.fxHideXs"
        [form]="field.form"
        [field]="field"
        [ngClass]="field.className"
        [ngStyle]="{'padding.px': 10}">
      </formly-field>
    </div>
    <ng-container #content>
      <ng-content></ng-content>
    </ng-container>
  `,
    styles: [
        `
    
    `
    ]
})
export class FormlyFormFlexLayoutComponent extends FormlyForm {
}
