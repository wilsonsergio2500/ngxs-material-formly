import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormTypeBuilder } from '../../modules/form-type-builder/form-type-builder.service';
import { NgTypeFormGroup } from '../../modules/form-type-builder/form-type-builder.model';
import { ILoginCredentials } from './login.contract';
import { Store, Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { LoginWithEmailAndPassword, LoginFail } from '../../states/auth/auth.actions';
import { tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { AuthState } from '../../states/auth/auth.state';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    LoginForm: NgTypeFormGroup<ILoginCredentials>;
    hasError: boolean = false;
    private subscription: Subscription;

    @Select(AuthState.IsLoading) working$: Observable<boolean>;

    constructor(
        private formTypeBuilder: FormTypeBuilder,
        private store: Store,
        private actions: Actions

    ) {

    }
    ngOnInit() {
        this.bindForm();
    }

    bindForm() {

        this.LoginForm = this.formTypeBuilder.group<ILoginCredentials>({
            Username: [null, [Validators.required]],
            Password: [null, [Validators.required, Validators.minLength(4)]]
        });


        this.LoginForm.setContractErrors({
            Username: {
                required: 'Username is required'
            },
            Password: {
                required: 'Password is required',
                minlength: 'Password is invalid'
            }
        });

        this.subscription = this.actions.pipe(
            ofActionSuccessful(LoginFail),
            tap(() => {
                this.hasError = true;
                this.LoginForm.reset();
            })
        ).subscribe();


    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    Submit() {

        if (this.LoginForm.valid) {

            this.store.dispatch(new LoginWithEmailAndPassword({
                email: this.LoginForm.value.Username,
                password: this.LoginForm.value.Password
            }));

        }
    }
}
