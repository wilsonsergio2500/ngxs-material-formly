import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { extend } from 'webdriver-js-extender';
import { FormlyLifeCycleOptions } from '@ngx-formly/core/lib/components/formly.field.config';


export namespace FieldSchemas {

  interface IOption {
    label: string;
    value: string;
  }

  interface IFormlyValidator {
    expression: (formGroup: FormGroup) => boolean;
    message: (error, field: FormlyFieldConfig) => string;

  }
  interface IFormlyAsyncValidator {
    expression: (formGroup: FormGroup) => Promise<boolean>;
    message: (error, field: FormlyFieldConfig) => string;
  }

  export interface IImageResizeIoUploaderOptions {
    previewFlexSize: number;
    thumbnailMissingImageUrl: string;
    aspectRatioWidth: number;
    aspectRatioHeight: number;
    thumbnailActualWidth: number;
    thumbnailActualHeight: number;
    viewerPreserveAspectRatio: boolean;
  }

  export interface IFormlyAppTemplateOptions extends FormlyTemplateOptions {
    fxFlex: string | number;
    toolbar: any;
    autogrow: boolean;
    fxHideXs: boolean;
    rioUploader: IImageResizeIoUploaderOptions;
    height: number;
    suffixIcon: string;
    prefixIcon: string;
  }

  class InputBase implements FormlyFieldConfig {
    key: string;
    type: string;
    templateOptions: IFormlyAppTemplateOptions;
    optionsTypes?: string[];
    defaultValue?: any;
    validation?: {
      messages?: {
        [messageProperties: string]: string | ((error: any, field: FormlyFieldConfig) => string);
      };
      show?: boolean;
      [additionalProperties: string]: any;
    };
    validators?: { [validatorProperty: string]: IFormlyValidator }
    asyncValidators?: { [validatorAsyncProperty: string]: IFormlyAsyncValidator }
    formControl?: AbstractControl;
    hideExpression?: boolean | string | ((model: any, formState: any) => boolean);
    wrappers?: string[];
    className?: string;
    modelOptions?: {
      debounce?: {
        default: number;
      };
    };
    lifecycle?: FormlyLifeCycleOptions;
    expressionProperties?: {
      [property: string]: string | ((model: any, formState: any) => boolean);
    } | any;

    constructor(key: string, label: string, required: boolean = false) {
      this.key = key;
      this.type = 'input';
      this.wrappers = ['suffix', 'form-field', 'prefix' ];
      this.templateOptions = <IFormlyAppTemplateOptions>{ label, required, fxFlex: 100, fxHideXs: false };
      this.modelOptions = {};
      const messages = {
        required: (error, field: FormlyFieldConfig) => {
          return `${field.templateOptions.label} is required`;
        }
      }

      if (required) {
        this.validation = { messages }
      }

    }

  }

  export class InputField<T = any> extends InputBase {
    constructor(key: keyof T, label: string, required: boolean = false) {
      super(key, label, required);
      this.templateOptions.type = 'text';
    }
  }

  export class EmailField extends InputBase {
    constructor(key: string, label: string, required: boolean = false) {
      super(key, label, required);
      this.validators = {
        'email': {
          expression: (formGroup: FormGroup) => {
            let value = formGroup.value;
            if (!!value) {
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return regex.test(value);
            } else {
              //if value should be handle by the required validator
              return true;
            }

          },
          message: (error, field: FormlyFieldConfig) => {
            return `${field.formControl.value} is not a valid Email Address`;
          }
        },

      }
      this.templateOptions.type = 'email';
    }
  }

  export class NumberField<T = any>  extends InputBase {
    constructor(key: keyof T, label: string, required: boolean = false) {
      super(key, label, required);
      this.type = 'input-number';
      this.templateOptions.type = 'number';
    }
  }

  export class PasswordField extends InputBase {
    constructor(key: string, label: string) {
      super(key, label, true);
      this.templateOptions.type = 'password';
    }
  }

  export class SelectField<T = any> extends InputBase {
    constructor(key: keyof T, label: string, options: IOption[], required: boolean = false) {
      super(key, label, required);
      this.type = 'select';
      this.templateOptions.options = options;
    }
  }

  export class CheckBoxField extends InputBase {
    constructor(key: string, label: string) {
      super(key, label, false);
      this.type = 'checkbox';
      this.defaultValue = false;

    }
  }

  export class RadioField extends InputBase {
    constructor(key: string, label: string, options: IOption[]) {
      super(key, label, true);
      this.type = 'radio';
      this.templateOptions.options = options;

    }
  }

  export class DatePickerField<T = any> extends InputBase {
    constructor(key: keyof T, label: string, required: boolean = false) {
      super(key, label, required);
      this.type = 'datepicker';
      this.templateOptions.min = new Date(1900, 1, 1, ) as any;
      this.templateOptions.max = new Date(3000, 1, 1) as any;
      this.validators = {
        'min': {
          expression: (formGroup: FormGroup) => {
            const value = formGroup.value;

            if (Object.prototype.toString.call(value) === '[object Date]') {
              return (value > this.templateOptions.min);
            } else {
              const normalized : any = new Date(value);
              return (normalized > this.templateOptions.min);
            }

          },
          message: (error, field: FormlyFieldConfig) => {
            return `${field.templateOptions.label} value ${field.formControl.value} is not valid`;
          }
        },
        'max': {
          expression: (formGroup: FormGroup) => {
            const value = formGroup.value;

            if (Object.prototype.toString.call(value) === '[object Date]') {
              return (value < this.templateOptions.max);
            } else {
              const normalized: any = new Date(value);
              return (normalized < this.templateOptions.max);
            }


          },
          message: (error, field: FormlyFieldConfig) => {
            return `${field.templateOptions.label} value ${field.formControl.value} is not valid`;
          }
        }

      }
    }
  }

  export class ToogleField<T = any> extends InputBase {
    constructor(key: keyof T, label: string) {
      super(key, label, true);
      this.type = 'toggle';
      this.defaultValue = false;
    }
  }

  export class EditorField<T = any> extends InputBase{
    constructor(key: keyof T, label: string, required: boolean)  {
      super(key, label, required);
      this.type = 'quill-editor';
      this.className = 'fomrly-quill-editor';
    }
  }

  export class FriendlyUrlField<T = any> extends InputBase {
    constructor(key: keyof T, label: string, required: boolean) {
      super(key, label, required);
      this.validators = {
        'urlfriendly': {
          expression: (formGroup: FormGroup) => {
            if (!!formGroup.value) {
              const regex = /[ !@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/g;
              return !regex.test(formGroup.value);
            } else {
              return true;
            }
          },
          message: (error, field: FormlyFieldConfig) => {
            return `"${field.formControl.value}" is not a valid url name`;
          }
        }
      }
      this.templateOptions.description = 'no slashes, spaces or special characters';
    }
  }

  export class ImageResizeIoUploadFile<T = any> extends InputBase{
    constructor(key: keyof T, label: string, required: boolean) {
      super(key, label, required);
      this.type = 'image-resize-io-uploader';
      this.templateOptions.rioUploader = <IImageResizeIoUploaderOptions>{
        previewFlexSize: 100,
        thumbnailMissingImageUrl: 'https://im.ages.io/dSaintlp',
        aspectRatioWidth: 2,
        aspectRatioHeight: 1,
        thumbnailActualWidth: 300,
        thumbnailActualHeight: 200
      };
      this.templateOptions.placeholder = 'Upload';
    }
  }

  export class ChipField<T = any> extends InputBase {
    constructor(key: keyof T, label: string, required: boolean) {
      super(key, label, required);
      this.type = 'formly-chips';
      this.templateOptions.placeholder = 'Enter Elements..';

    }
  }

  export class EmptyTemplate  {
    template: string;
    className: string;
    templateOptions: IFormlyAppTemplateOptions = <IFormlyAppTemplateOptions>{};
    constructor(fxFlex: number = 100) {
      this.template = '<div></div>';
      this.templateOptions.fxFlex = fxFlex;
      this.templateOptions.fxHideXs = true;
      this.className = 'xs-hide';
    }
  }
}
