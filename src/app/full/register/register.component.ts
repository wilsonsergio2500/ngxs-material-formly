import { Component, OnInit } from '@angular/core';
import { NgTypeFormGroup, NgTypeFormControl } from '../../modules/form-type-builder/form-type-builder.model';
import { IRegistrationForm } from './register.contract';
import { FormTypeBuilder } from '../../modules/form-type-builder/form-type-builder.service';
import { Store, Select } from '@ngxs/store';
import { Validators } from '@angular/forms';
import { CreateUserwithEmailAndPassword } from '../../xs-ng/auth/auth.actions';
import { AuthState } from '../../xs-ng/auth/auth.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: [`register.component.scss`]
  })
  export class RegisterComponent implements OnInit {

    form: NgTypeFormGroup<IRegistrationForm>;
    @Select(AuthState.getErrorMessage) error$: Observable<string>;
    btnLoading = false;

    constructor(
        private formTypeBuilder: FormTypeBuilder,
        private store: Store
    ) {
    }

    ngOnInit() {

        this.form = this.formTypeBuilder.group<IRegistrationForm>({
            Username: [null, [Validators.required, Validators.email]],
            Password: [null, [Validators.required, Validators.minLength(6)]],
            ConfirmPassword: [null, [
                (c: NgTypeFormControl<string, IRegistrationForm>) => {
                    if (c && c.parent && c.parent.value.Password === c.value) {
                        return null;
                    }
                    return { notMatch: true };
                }
            ]]
        });

        this.form.setContractErrors({
            Username: {
                required: 'Username is required',
                email: 'Username must be a valid email'
            },
            Password: {
                required: 'Password is required',
                minlength: 'Password is invalid'
            },
            ConfirmPassword: {
                notMatch: 'Password must match'
            }
        });


    }

    Submit() {

        const { Username : email, Password : password } = this.form.value;
        this.store.dispatch(new CreateUserwithEmailAndPassword({ email, password }));

    }
  
  } 
