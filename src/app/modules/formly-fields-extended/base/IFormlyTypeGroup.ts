import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

export interface IFormlyTypeGroup<T = any> {
  model?: T;
  options?: FormlyFormOptions;
  fields?: FormlyFieldConfig[];
  form?: FormGroup;

  IsAsyncValidating?: boolean;
  IsBusy?: boolean;

}
