import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormlyLifeCycleOptions } from '@ngx-formly/core/lib/components/formly.field.config';
import { IFileUploaderOptions } from '../types/file-uploader/contracts/file-uploader-formly.options';
import { Observable } from 'rxjs';
import { getCountryStates } from '../../../utils/country-states';
import { IImageResizeIoUploaderOptions } from '../types/image-resize-io-upload/contracts/image-rio-uploader-options';
import { IFirebaseImageFormlyTemplateOptions } from '../types/firebase-image-formly/firebase-image-formly.module';
import { IMatEditorFormlyTemplateOptions } from '../types/mat-editor-formly/mat-editor-formly.module';
import { IFirebaseImageGalleryFormlyTemplateOptions } from '../types/firebase-image-gallery-formly/firebase-image-gallery-formly.module';


export namespace FieldTypes {


  interface IOption {
    label: string;
    value: string;
  }

  export interface IRadioFieldOption extends IOption {
    label: string;
    value: string;
  }


  interface IFormlyValidator {
    expression: (formGroup: FormGroup, field: FormlyFieldConfig) => boolean;
    message: (error, field: FormlyFieldConfig) => string;

  }
  interface IFormlyAsyncValidator {
    expression: (formGroup: FormGroup) => Promise<boolean>;
    message: (error, field: FormlyFieldConfig) => string;
  }

  interface ITextMask {
    mask: any[] | ((val: any) => any[]);
    guide?: boolean;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    pipe?: () => any;
    showMask?: boolean;
  }



  export interface IFormlyAppTemplateOptions extends FormlyTemplateOptions {
    fxFlex: string | number;
    fxFlexXs: string | number;
    toolbar: any;
    autogrow: boolean;
    fxHideXs: boolean;
    fileUploder: IFileUploaderOptions;
    fileResizeIoUploader: IImageResizeIoUploaderOptions,
    firebaseImageFormlyconfig: IFirebaseImageFormlyTemplateOptions,
    firebaseImageGalleryFormlyconfig: IFirebaseImageGalleryFormlyTemplateOptions,
    matEditorFormlyConfig: IMatEditorFormlyTemplateOptions;
    height: number;
    suffixIcon: string;
    prefixIcon: string;
    textMask: ITextMask
  }

  class InputBase implements FormlyFieldConfig {
    key: string;
    type: string;
    templateOptions: Partial<IFormlyAppTemplateOptions>;
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

    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      this.type = 'input';
      this.wrappers = ['suffix', 'form-field', 'prefix'];
      this.templateOptions = <IFormlyAppTemplateOptions>{
        label, required, fxFlex, fxFlexXs: 100, fxHideXs: false, textMask: {}
      };
      this.modelOptions = {};
      const messages = {
        required: (error, field: FormlyFieldConfig) => {
          return `${field.templateOptions.label} is required`;
        }
      }

      if (config && config.templateOptions) {
        config.templateOptions = { ...this.templateOptions, ...config.templateOptions }
      }

      if (!!config) {
        const configp = { ...config };


        Object.keys(configp).forEach((key) => {
          this[key] = configp[key];
        })
      }

      if (this.templateOptions.required) {
        this.validation = { messages }
      }

    }

  }

  export class InputField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.templateOptions.type = 'text';
    }
  }

  export class HiddenField extends InputBase {
    constructor(label?: string, required: boolean = true) {
      super(label, required, 100);
      this.templateOptions.type = 'text';
      this.className = 'hidden-field';
    }
  }

  export class ChipField extends InputBase {
    constructor(label: string, placeholder: string, required: boolean, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'formly-chips';
      this.templateOptions.placeholder = placeholder;
      this.className = 'chips-formly';
    }
  }


  export class EmailField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
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

  export class NumberField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'input-number';
      this.templateOptions.type = 'number';
    }
  }

  export class PasswordField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.templateOptions.type = 'password';
    }
  }

  export class SelectField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, options: IOption[] | Observable<any[]> = [], config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'select';
      this.templateOptions.options = options;
    }
  }

  export class CheckBoxField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'checkbox';
      this.defaultValue = false;

    }
  }

  export class RadioField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, options: IRadioFieldOption[] = [], config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'radio';
      this.templateOptions.options = options;

    }
  }

  export class DatePickerField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'datepicker';
      this.templateOptions.min = new Date(1900, 1, 1,) as any;
      this.templateOptions.max = new Date(3000, 1, 1) as any;
      this.validators = {
        'min': {
          expression: (formGroup: FormGroup) => {
            const value = formGroup.value;
            if (Object.prototype.toString.call(value) === '[object Date]') {
              return (value > this.templateOptions.min);
            } else {
              const normalized: any = new Date(value);
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
  export class FutureDatePickerField extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'datepicker';
      this.templateOptions.min = new Date(Date.now()) as any;
      this.templateOptions.max = new Date(3000, 1, 1) as any;
      this.validators = {
        'min': {
          expression: (formGroup: FormGroup) => {
            const value = formGroup.value;
            if (Object.prototype.toString.call(value) === '[object Date]') {
              return (value > this.templateOptions.min);
            } else {
              const normalized: any = new Date(value);
              return (normalized > this.templateOptions.min);
            }

          },
          message: (error, field: FormlyFieldConfig) => {
            return `"${field.templateOptions.label}" must be a future date`;
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
            return `'${field.templateOptions.label}' value ${field.formControl.value} is not valid`;
          }
        }

      }
    }
  }

  export class ToogleField extends InputBase {
    constructor(label?: string, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, true, fxFlex, config);
      this.type = 'toggle';
      this.defaultValue = false;
    }
  }

  export class TextArea extends InputBase {
    constructor(label?: string, required: boolean = true, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'textarea';
    }
  }

  export class MaskField extends InputBase {
    constructor(label: string, maskConfig: Partial<ITextMask>, required = true, fxFlex = 100) {
      super(label, required, fxFlex)
      this.type = 'input-mask';
      this.templateOptions.textMask = { ...this.templateOptions.textMask, ...maskConfig };
    }
  }

  export class PhoneMaskedField extends InputBase {
    constructor(label: string, required = true, fxFlex = 100) {
      super(label, required, fxFlex)
      this.type = 'input-mask';
      this.templateOptions.textMask = <ITextMask>{
        mask: [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
      this.templateOptions.description = 'Enter phone format as ###-###-####';
      //this.validators = {
      //  'phone': {
      //    expression: (formGroup: FormGroup) => {
      //      let value = formGroup.value;
      //      if (!!value) {
      //        let regex = /^\d{3}-\d{3}-\d{4}$/;
      //        return regex.test(value);
      //      } else {
      //        //if value should be handle by the required validator
      //        return true;
      //      }

      //    },
      //    message: (error, field: FormlyFieldConfig) => {
      //      return `${field.templateOptions.label} is not in a valid format`;
      //    }
      //  },

      //}

    }
  }

  export class ZipCodeMaskedField extends InputBase {
    constructor(label: string, required = true, fxFlex = 100) {
      super(label, required, fxFlex)
      this.type = 'input-mask';
      this.templateOptions.textMask = <ITextMask>{
        mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
      this.templateOptions.description = 'Enter Zip Code format as #####-####';
    }
  }

  export class PickStateField extends InputBase {
    constructor(label: string, required = true, fxFlex = 100) {
      super(label, required, fxFlex)
      this.type = 'select';
      const states = getCountryStates();
      this.templateOptions.options = states.map(g => <IOption>{ label: g.name, value: g.abbreviation });

    }
  }

  export class PickBooleanField extends InputBase {
    constructor(label: string, required = true, fxFlex = 100) {
      super(label, required, fxFlex)
      this.type = 'select';
      const choices = [
        {
          "name": "--Select Yes/No--",
          "value": "0"
        },
        {
          "name": "Yes",
          "value": "1"
        },
        {
          "name": "No",
          "value": "2"
        }];
      this.templateOptions.options = choices.map(g => <IOption>{ label: g.name, value: g.value });
      this.validators = {
        match: {
          expression: ({ value }, { model }) => {
            return value != 0;
          },
          message: (error, field) => {
            return `Must be Yes or No.`;
          }
        }
      }
    }
  }

  export class FileUploader extends InputBase {
    constructor(required: boolean = true, fxFlex: number = 100, templateConfig: Partial<IFileUploaderOptions> = { placeholder: 'Upload Document' }) {
      super(templateConfig.placeholder, required, fxFlex)
      this.type = 'formly-file-uploader';
      this.className = 'formly-file-uploader';
      this.templateOptions.fileUploder = { ...templateConfig };
      this.templateOptions.label = 'Document';
    }
  }

  export class FriendlyUrlField extends InputBase {
    constructor(label: string, required: boolean, fxFlex = 100, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
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
      this.templateOptions.description = 'No slashes, spaces or special characters';
    }
  }

  export class ImageResizeIoUploader extends InputBase {
    constructor(label: string, required: boolean, fxFlex = 100, templateConfig: Partial<IImageResizeIoUploaderOptions> = { thumbnailMissingImageUrl: 'https://im.ages.io/dSaintlp' }, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'image-resize-io-uploader';
      const defaults = <IImageResizeIoUploaderOptions>{
        previewFlexSize: 100,
        thumbnailMissingImageUrl: 'https://im.ages.io/dSaintlp',
        thumbnailAspectRatio: { width: 2, height: 1 },
        thumbnailDimensions: { width: 300, height: 200 }
      }
      this.templateOptions.fileResizeIoUploader = { ...defaults, ...templateConfig };
      this.templateOptions.placeholder = label;
    }

  }

  export class FirebaseImageUploader extends InputBase {
    constructor(label: string, required: boolean, fxFlex = 100, firebaseImageFormlyconfig?: Partial<IFirebaseImageFormlyTemplateOptions>, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'firebase-image-uploader';
      this.templateOptions.firebaseImageFormlyconfig = { ...this.templateOptions.firebaseImageFormlyconfig, ...firebaseImageFormlyconfig };
      this.templateOptions.placeholder = label;
    }
  }

  export class FirebaseImageGalleryUploader extends InputBase {
    constructor(label: string, required: boolean, fxFlex = 100, firebaseImageGalleryFormlyconfig?: Partial<IFirebaseImageGalleryFormlyTemplateOptions>, config?: Partial<InputBase>) {
      super(label, required, fxFlex, config);
      this.type = 'firebase-imaga-gallery-uploader';
      this.templateOptions.firebaseImageGalleryFormlyconfig = { ...this.templateOptions.firebaseImageGalleryFormlyconfig, ...firebaseImageGalleryFormlyconfig };
      this.templateOptions.placeholder = label;
    }
  }

  export class MatEditor extends InputBase {
    constructor(label: string, required: boolean, fxFlex = 100, matEditorFormlyConfig: Partial<IMatEditorFormlyTemplateOptions> = { placeholder: 'Insert Text here...' }, config: Partial<InputBase> = { className: 'mat-editor-formly-field' }) {
      super(label, required, fxFlex, config);
      this.type = 'mat-editor-formly';
      this.templateOptions.matEditorFormlyConfig = { ...matEditorFormlyConfig } as IMatEditorFormlyTemplateOptions;
    }
  }


}
