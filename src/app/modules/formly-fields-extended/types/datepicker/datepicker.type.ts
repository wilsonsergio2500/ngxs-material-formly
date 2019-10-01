import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'formly-field-mat-datepicker',
  templateUrl: 'datapicker.type.html',
  styleUrls: ['datepicker.type.scss']
})
export class FormlyDatepickerTypeComponent extends FieldType {
  @ViewChild(MatInput, { static: false}) formFieldControl: MatInput;
}
