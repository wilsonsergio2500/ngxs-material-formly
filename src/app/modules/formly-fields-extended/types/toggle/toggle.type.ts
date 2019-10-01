import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'formly-field-mat-toggle',
  template: `
    <mat-slide-toggle
      [id]="id"
      [formControl]="formControl"
      [formlyAttributes]="field">
      {{ to.label }}
    </mat-slide-toggle>
  `,
})
export class FormlyToggleTypeComponent extends FieldType {
  @ViewChild(MatSlideToggle, { static: false}) slideToggle: MatSlideToggle;

  onContainerClick(event: MouseEvent): void {
    this.slideToggle.focus();
    super.onContainerClick(event);
  }
}
