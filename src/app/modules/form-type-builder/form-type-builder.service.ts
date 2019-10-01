import { Injectable } from "@angular/core";
import {
    FormBuilder as NgFormBuilder,
    ValidatorFn,
    AsyncValidatorFn,
} from "@angular/forms";

import { NgTypeAbstractControl, NgTypeFormControl, NgTypeFormGroup, NgTypeFormArray } from "./form-type-builder.model";

const Init = function () {
    this.__submitted = false;
};
const setFormErrors = function (config: any) {
    this.__errors = { ...config };
};
const setContractErrors = function (config: any) {
    this.__contractErrors = { ...config };
};
const setFormControlErrors = function (key: string, config: any) {
    if (!!this.__contractErrors) {
        this.__contractErrors = { ...this.__contractErrors };
        this.__contractErrors[key] = config;
    } else {
        this.__contractErrors = {};
        this.__contractErrors[key] = config;
    }
};
const MarkAsSubmitted = function () {
    this.__submitted = true;
};
const IsSubmited = function () {
    return this.__submitted;
};

@Injectable()
export class FormTypeBuilder {

    private _delegate: NgFormBuilder;
    static create() {
        return new FormTypeBuilder();
    }

    constructor() {
        this._delegate = new NgFormBuilder();
    }

    group<T>(value: T): NgTypeFormGroup<T>;
    group<S>(controlsConfig: { [p in keyof S]: any }, extra?: { [key: string]: any }): NgTypeFormGroup<S>;
    group(controlsConfig: { [key: string]: any }, extra?: { [key: string]: any }) {
        const formGroup = this._delegate.group(controlsConfig, extra);
        (formGroup as any).Init = Init.bind(formGroup);
        (formGroup as any).setFormErrors = setFormErrors.bind(formGroup);
        (formGroup as any).setContractErrors = setContractErrors.bind(formGroup);
        (formGroup as any).setFormControlErrors = setFormControlErrors.bind(formGroup);
        (formGroup as any).markAsSubmitted = MarkAsSubmitted.bind(formGroup);
        (formGroup as any).IsSubmited = IsSubmited.bind(formGroup);
        return formGroup;
    }

    control<T>(value: T, validator?: ValidatorFn | ValidatorFn[] | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): NgTypeFormControl<T>;
    control(formState: Object, validator?: ValidatorFn | ValidatorFn[] | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        return this._delegate.control(formState, validator, asyncValidator);
    }

    array<T>(controls: NgTypeAbstractControl<T>[], validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null): NgTypeFormArray<T>;
    array<S>(controlsConfig: any[], validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null): NgTypeFormArray<S>;
    array(controlsConfig: any[], validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null) {
        return this._delegate.array(controlsConfig, validator, asyncValidator);
    }
}

