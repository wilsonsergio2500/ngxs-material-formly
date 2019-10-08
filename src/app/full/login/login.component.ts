import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormTypeBuilder } from '../../modules/form-type-builder/form-type-builder.service';
import { NgTypeFormGroup } from '../../modules/form-type-builder/form-type-builder.model';
import { ILoginCredentials } from './login.contract';
import { Store } from '@ngxs/store';
import { LoginWithEmailAndPassword } from '../../xs-ng/auth/auth.actions';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: NgTypeFormGroup<ILoginCredentials>;
  btnLoading: boolean = false;
  hasError: boolean = false;

  constructor(
    private formTypeBuilder: FormTypeBuilder,
    private store: Store
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

    

    //this.actions.pipe(ofActionErrored(Login)).subscribe((x) => {
    //  this.hasError = true;
    //  this.btnLoading = false;
    //  this.LoginForm.reset();
    //});

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
