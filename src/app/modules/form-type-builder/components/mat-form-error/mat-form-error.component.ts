
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';


@Component({
    selector: 'mat-form-error',
    templateUrl: 'mat-form-error.component.html'

})
export class MatFormErrorComponent implements OnInit {

    @Input()
    formControlItem: string;
    @Input()
    errors: any = null;
    @Input()
    showOnFormTouched: boolean = false;

    private _errors: any = {
        required: "Required",
        minlength: "Minimum length not met",
        maxlength: "Exceeds the maximum length",
        isValidEmailAddress: "Invalid email address",
        isValidSelection: "Invalid selection",
        isStringValidByRegEx: "Invalid character",
        isStringInRange: "Invalid string length",
        isInRange: "Number is outside specified range",
        isGreaterThanMin: "Exceeds allowed value",
        doControlValuesMatch: "Values do not match",
        email: "Invalid email address"
    };

    constructor(@Inject(FormGroupDirective) private formGroupService: FormGroupDirective) {
    }

    ngOnInit(): void {

        const fgroup: any = this.formGroupService.form;

        if (!!this.errors) {
            this._errors = { ...this._errors, ...this.errors };
        }
        if (!!fgroup.__errors) {
            this._errors = { ...this._errors, ...fgroup.__errors };
        }
        if (!!fgroup.__contractErrors && !!fgroup.__contractErrors[this.formControlItem]) {
            this._errors = { ...this._errors, ...fgroup.__contractErrors[this.formControlItem] };
        }
    }

    get errorMessage() {

        const formControl = this.formGroupService.form.get(this.formControlItem);
        if (!!formControl.errors) {
            const fgroup: any = this.formGroupService.form;

            const keys = Object.keys(formControl.errors);
            return (this._errors[keys[0]] || null);
        }
        return null;
    }

    get ControlTouched() {
        const formControl = this.formGroupService.form.get(this.formControlItem);
        if (this.showOnFormTouched) {
            if (formControl) {
                return formControl.parent.touched;
            }
        } else {
            if (formControl) {
                return formControl.touched || (!!(formControl.parent as any).__submitted);
            }
        }
        return true;
    }

}
