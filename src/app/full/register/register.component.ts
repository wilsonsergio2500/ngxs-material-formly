import { Component, AfterContentInit, OnInit } from '@angular/core';
import { NgTypeFormGroup, NgTypeFormControl } from '../../modules/form-type-builder/form-type-builder.model';
import { IRegistrationForm } from './register.contract';
import { FormTypeBuilder } from '../../modules/form-type-builder/form-type-builder.service';
import { Store } from '@ngxs/store';
import { Validators } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: [`register.component.scss`]
  })
  export class RegisterComponent implements OnInit {

    form: NgTypeFormGroup<IRegistrationForm>;
    constructor(
        private formTypeBuilder: FormTypeBuilder,
        private store: Store
    ) {
    }

    ngOnInit() {

        this.form = this.formTypeBuilder.group<IRegistrationForm>({
            Username: [null, [Validators.required]],
            Password: [null, [Validators.required, Validators.minLength(6)]],
            ConfirmPassword: [null, [
                (c: NgTypeFormControl<string, IRegistrationForm>) => {
                    if (c && c.parent && c.parent.value.Password === c.parent.value.ConfirmPassword) {
                        return null;
                    }
                    return { notMatch: true };
                }
            ]]
        })
    }
  
  } 
