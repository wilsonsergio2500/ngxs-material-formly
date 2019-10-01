
import { Component, Optional, Self, Inject, Injector, AfterContentInit, OnInit, Input } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { BaseMatErrorAccesorHandler } from './base/basematerroraccesorhandler';

@Component({
    selector: 'mat-form-error-accesor',
    templateUrl: 'mat-form-error-accesor.component.html'
})
export class MatFormErrorAccesorComponent implements  OnInit {

    @Input()
    errors: any = null;
    @Input()
    formControlContractItem: string;
    @Input()
    showOnFormTouched: boolean = false;

    private FormControl: FormControl;
    private valueAccesor: ControlValueAccessor;
    private _errors:  any = {
        required: "Required",
        minlength: "Minimum length not met",
        maxlength: "Exceeds the maximum length",
    };

    constructor(private injector: Injector) {
    }

    ngOnInit(): void {
        const ngControl: NgControl = this.injector.get(NgControl, null);
        if (ngControl) {
            this.FormControl = ngControl.control as FormControl;
        }
        if (ngControl.valueAccessor) {
            const valueAccesor: BaseMatErrorAccesorHandler = ngControl.valueAccessor as any;

            if (!!this.errors) {
                this._errors = { ...this._errors, ...this.errors };
            }
            if (!!valueAccesor.__errors) {
                this._errors = { ...this._errors, ...valueAccesor.__errors };
            }
            if (!!valueAccesor.__contractErrors && !!valueAccesor.__contractErrors[this.formControlContractItem]) {
                this._errors = { ...this._errors, ...valueAccesor.__contractErrors[this.formControlContractItem] };
            }
        }
    }

    get errorMessage() {

        const formControl = this.FormControl;
        if (!!formControl) {
            if (!!formControl.errors) {

                const key = Object.keys(this._errors).find(g => formControl.errors[g]);
                if (!!key) {
                    return (this._errors[key] || null);
                }
            }
        }
        return null;
    }

    get ControlTouched() {
        const formControl = this.FormControl;
        if (this.showOnFormTouched) {
            if (this.FormControl) {
                return this.FormControl.parent.touched && !!this.errorMessage;
            }
        } else {
            if (this.FormControl) {
                return (this.FormControl.touched && !!this.errorMessage) || ((!!(formControl.parent as any).__submitted) && !!this.errorMessage);
            }
        }
        return false;
    }
}

