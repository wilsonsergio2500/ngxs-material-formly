import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-field-mat-input-number',
  templateUrl: 'number.component.html'
})
export class FormlyFieldNumberInput extends FieldType {
  @ViewChild(MatInput, { static: false}) formFieldControl!: MatInput;

  get type() {
    return 'number';
  }

}
