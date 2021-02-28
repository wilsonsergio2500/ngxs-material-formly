import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormTypeBuilder } from '../../modules/form-type-builder/form-type-builder.service';
import { NgTypeFormGroup } from '../../modules/form-type-builder/form-type-builder.model';
import { ILoginCredentials } from './login.contract';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoginWithEmailAndPassword, LoginFail } from '../../xs-ng/auth/auth.actions';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    LoginForm: NgTypeFormGroup<ILoginCredentials>;
    btnLoading: boolean = false;
    hasError: boolean = false;
    private subscription: Subscription;

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


        this.LoginForm.setContractErrors<ILoginCredentials>({
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
                this.btnLoading = false;
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
            this.btnLoading = true;


            this.store.dispatch(new LoginWithEmailAndPassword({
                email: this.LoginForm.value.Username,
                password: this.LoginForm.value.Password
            }))



        }
    }
}
