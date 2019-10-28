import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IFormlyTypeGroup } from '../../base/IFormlyTypeGroup';

/*
usage:
  <formly-form-flex-json [formlyGroup]="formlyGroup"
                           [show-revert]="true"
                           btn-ready="Create"
                           btn-busy="Creating..."
                           [read-only]="false"
                           [is-busy]="isPosting$ | async"
                           (onFormSubmit)="formSubmit($event)">
      </formly-form-flex-json>
*/

@Component({
  selector: 'formly-form-flex-json',
  templateUrl: 'formly-form-flex-json.component.html',
  styleUrls: [
    'formly-form-flex-json.component.css'
  ]
})
export class FormlyFormFlexJsonComponent<T> implements OnChanges{

  private _showRevertbtn: boolean = false;

  @Input()
  formlyGroup: IFormlyTypeGroup<T>;

  @Input('btn-ready')
  btnReady: string;

  @Input('btn-busy')
  btnBusy: string;

  @Input('is-busy')
  btnIsBusy: boolean = false;

  disableOnInvalid: boolean = false;
  @Input('btn-disable-on-invalid')
  set disableSubmitBtnOnInvalid(value: boolean) {
    this.disableOnInvalid = coerceBooleanProperty(value);
  }
  

  @Input('read-only')
  readOnly: boolean = false;


  @Input('show-revert')
  set showRevertBtn(value: boolean) {
    this._showRevertbtn = coerceBooleanProperty(value);
  }
  get showRevertBtn() {
    return this._showRevertbtn;
  }

  @Output()
  onFormSubmit: EventEmitter<T> = new EventEmitter<T>();


  constructor() {
  }

  ngOnChanges(changes: any) {
  }

  get isSubmitDisabled() {
    return (this.disableOnInvalid) ? this.formlyGroup.form.invalid : false;
  }

  submit($event : Event) {
    
    if (this.readOnly === false && this.formlyGroup.form.valid) {
      this.onFormSubmit.emit(this.formlyGroup.model);
    }
  }


}
