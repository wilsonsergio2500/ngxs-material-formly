import { Component, OnInit } from '@angular/core';
import { IAdminPostCreate } from './admin-post-crete.contract';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { Store } from '@ngxs/store';
import { CreatePostAction } from '../../xs-ng/posts/posts.actions';
import { ActivatedRoute } from '@angular/router';
import { SnackbarStatusService } from '../../../../components/ui-elements/snackbar-status/service/snackbar-status.service';

@Component({
    selector: 'admin-post-create',
    templateUrl: 'admin-post-create.component.html',
    styleUrls: ['admin-post-create.component.scss']
})
export class AdminPostCreateComponent implements OnInit {

    formlyGroup: FormlyTypeGroup<IAdminPostCreate>;

    constructor(
        private store: Store,
        private activatedRoute: ActivatedRoute,
        private snackBarStatus: SnackbarStatusService
    ) {
        console.log(this.activatedRoute.snapshot);
    }

    ngOnInit() {
        this.bindForm();
        this.snackBarStatus.OpenComplete('completed');
    }

    bindForm() {

        const url = new FieldTypes.InputField('Url', true);
        const title = new FieldTypes.InputField('Title', true, 100);
        const date = new FieldTypes.DatePickerField('Date', true);
        //title.templateOptions.suffixIcon = 'bookmark';
        const body = new FieldTypes.InputField('Body', true, 100);

        this.formlyGroup = new FormlyTypeGroup<IAdminPostCreate>({
            url,
            title,
            date,
            body,
        });

    }
    formSubmit($event) {
        this.formlyGroup.markAsBusy();

        this.store.dispatch(new CreatePostAction({...this.formlyGroup.model}))

    }

}
