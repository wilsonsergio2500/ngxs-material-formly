import { Component } from '@angular/core';
import { IAdminPostCreate } from './admin-post-crete.contract';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';

@Component({
    selector: 'admin-post-create',
    templateUrl: 'admin-post-create.component.html',
    styleUrls: ['admin-post-create.component.scss']
})
export class AdminPostCreateComponent {

    formlyGroup: FormlyTypeGroup<IAdminPostCreate>;

    constructor() {
        this.bindForm();
    }

    bindForm() {

        const title = new FieldTypes.InputField('Title', true, 100);
        const body = new FieldTypes.InputField('Body', true, 100);

        this.formlyGroup = new FormlyTypeGroup<IAdminPostCreate>({
            title
        })
    }


}
