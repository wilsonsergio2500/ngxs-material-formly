import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material';


@Component({
  selector: 'mat-editor-formly',
  templateUrl: 'mat-editor-formly.component.html',
  styleUrls: [`mat-editor-formly.component.scss`]
})
export class MatEditorFormlyComponent extends FieldType {}
