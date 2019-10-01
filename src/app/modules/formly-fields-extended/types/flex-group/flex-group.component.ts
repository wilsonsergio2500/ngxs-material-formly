import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-group-flex-e',
  template: `
  <formly-field *ngFor="let f of field.fieldGroup"
    [fxFlex]="f.templateOptions.fxFlex"
    [fxFlex.xs]="100"
    [fxHide.xs]="f.templateOptions.fxHideXs"
    [ngClass]="f.className"
    [form]="f.form"
    [model]="f.model"
    [options]="options"
    [field]="f">
  </formly-field>
<ng-content></ng-content>
  `,
  host: {
    '[class]': 'field.fieldGroupClassName || ""',
  },
})
export class FormlyGroupFlexComponent extends FieldType {
  defaultOptions = {
    defaultValue: {},
  };
}
