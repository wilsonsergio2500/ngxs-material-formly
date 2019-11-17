import { Component } from '@angular/core';
import { IAdminPostCreate } from './admin-post-crete.contract';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'admin-post-create',
    templateUrl: 'admin-post-create.component.html',
    styleUrls: ['admin-post-create.component.scss']
})
export class AdminPostCreateComponent {

    formlyGroup: FormlyTypeGroup<IAdminPostCreate>;

    form = new FormGroup({});
    model = { email: 'email@gmail.com' };
    //fields: FormlyFieldConfig[] = [{
    //    key: 'email',
    //    type: 'input',
    //    templateOptions: {
    //        label: 'Email address',
    //        placeholder: 'Enter email',
    //        required: true,
    //    }
    //}];

    constructor() {
        this.bindForm();
    }

    bindForm() {

        const title = new FieldTypes.InputField('Title', true, 100);
        const body = new FieldTypes.InputField('Body', true, 100);
        const email = new FieldTypes.EmailField('Email', true, 100)

        this.formlyGroup = new FormlyTypeGroup<IAdminPostCreate>({
            title,
            body,
            email
        });

        this.formlyGroup.patchValue({ email: 'email@gmail.com' });


    }


}
