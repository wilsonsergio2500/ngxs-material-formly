import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { IFormlyTypeGroup } from './IFormlyTypeGroup';


export class FormlyTypeGroup<T = any> implements IFormlyTypeGroup<T> {

  model: T;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  form: FormGroup;

  IsAsyncValidating: boolean;
  IsBusy: boolean = false;

  constructor(config?: { [p in keyof T]: FormlyFieldConfig })
    constructor(config?: { [p in keyof T]: FormlyFieldConfig }, ops: IFormlyTypeGroup<T> = {}, ) {
    this.model = ops && ops.model || <T>{};
    this.options = ops && ops.options || <FormlyFormOptions>{};
    this.form = ops && ops.form || new FormGroup({});
    this.fields = ops && ops.fields || [];

    this.IsAsyncValidating = false;
    this.setFields(config);
  }

  markConstrlsAsPristine() {

    setTimeout(() => {

      for (var key in this.form.controls) {

        this.form.controls[key].markAsPristine();
        this.form.controls[key].markAsUntouched();

      }
    })
  }

  markAsDisable() {
    setTimeout(() => {
      for (var key in this.form.controls) {
        this.form.controls[key].disable();
      }
    });
  }

  reset() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValue(null);
      this.form.controls[key].markAsPristine();
      this.form.controls[key].markAsUntouched();
    });
  }

  markAsEnable() {
    setTimeout(() => {
      for (var key in this.form.controls) {
        this.form.controls[key].enable();
      }
    });
  }

  markAsDirtyAndAsTouched() {
    setTimeout(() => {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].markAsTouched();
      }
    })
  }

  markAsBusy() {
    this.IsBusy = true;
  }

  markAsIddle() {
    this.IsBusy = false;
  }
  setModel(model: T) {
    this.model = model;
  }

    get(key: keyof T) {
        return this.form.get(key);
    }

    patchValue(model: Partial<T>) {
        this.model = { ...this.model, ...model }
    }

  setFields(config: { [p in keyof T]: FormlyFieldConfig }) {

    if (!!config) {
      let fields = [];
      const keys = Object.keys(config);
      keys.forEach((key) => {
        let formlyConfig: FormlyFieldConfig = config[key];
        formlyConfig.key = key;
        fields.push(formlyConfig);
      });
        this.fields = [...fields];
        console.log(this.fields);
    }

  }

  createGroup(clasName: string, config: { [p in keyof T]: FormlyFieldConfig }) {
    if (!!config) {
      let fields = [];
      const keys = Object.keys(config);
      keys.forEach((key) => {
        let formlyConfig: FormlyFieldConfig = config[key];
        formlyConfig.key = key;
        fields.push(formlyConfig);
      });
    }
    const Group: FormlyFieldConfig = <FormlyFieldConfig>{ fieldGroupClassName: clasName };
    Group.fieldGroup = [...this.fields];

    this.fields = [...this.fields, Group];
  }

  createGroupHeading(title: string, clasName: string, config: { [p in keyof T]?: FormlyFieldConfig }) {

    const titleTemplate = <FormlyFieldConfig>{
      template: `<h3>${title}</h3>`,
      templateOptions: { fxFlex: 100}
    }

    if (!!config) {
      let fields = [];
      const keys = Object.keys(config);
      keys.forEach((key) => {
        let formlyConfig: FormlyFieldConfig = config[key];
        formlyConfig.key = key;
        fields.push(formlyConfig);
      });

      const Group = [titleTemplate, ...fields];
      this.fields = [...this.fields, ...Group];
    }
    
  }

}
