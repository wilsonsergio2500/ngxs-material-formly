import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgTypeFormGroup, NgTypeFormControl } from '../../modules/form-type-builder/form-type-builder.model';
import { IRegistrationForm } from './register.contract';
import { FormTypeBuilder } from '../../modules/form-type-builder/form-type-builder.service';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { Validators } from '@angular/forms';
import { CreateUserwithEmailAndPassword, RegistrationError } from '../../states/auth/auth.actions';
import { AuthState } from '../../states/auth/auth.state';
import { Observable, Subscription, merge } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: [`register.component.scss`]
  })
  export class RegisterComponent implements OnInit, OnDestroy {

    form: NgTypeFormGroup<IRegistrationForm>;
    @Select(AuthState.getErrorMessage) error$: Observable<string>;
    private subscriptions: Subscription[];

    @Select(AuthState.IsLoading) working$: Observable<boolean>;

    constructor(
        private formTypeBuilder: FormTypeBuilder,
        private store: Store,
        private actions: Actions
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

        const onPasswordChange$ = this.form.controls.Password.valueChanges.pipe(
            delay(1),
            tap(_ => {
                this.form.controls.ConfirmPassword.updateValueAndValidity();
            })
        ).subscribe();

        const finalized$ = merge(this.actions.pipe(ofActionSuccessful(RegistrationError)), this.actions.pipe(ofActionSuccessful(CreateUserwithEmailAndPassword))).pipe(
            tap(() => this.form.reset())
        ).subscribe();
        
        this.subscriptions = [onPasswordChange$, finalized$];

    }

    Submit() {

        const { Username : email, Password : password } = this.form.value;
        this.store.dispatch(new CreateUserwithEmailAndPassword({ email, password }));

    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(g => g.unsubscribe());
        }
    }
  
  } 
