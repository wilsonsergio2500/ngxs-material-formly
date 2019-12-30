import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { IAdminPageCreateForm } from './admin-page-create.contract';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';

@Component({
    selector: 'admin-page-create',
    templateUrl: 'admin-page-create.component.html',
    styleUrls: [`admin-page-create.component.scss`]
  })
export class AdminPageCreateComponent implements OnInit {
   
    formlyGroup: FormlyTypeGroup<IAdminPageCreateForm>;

    btnReadyLabel = 'Update';
    btnLoadingLabel = 'Updating...';
    componentTitle = 'Admin Page Create Title';
    listPath = "../list"

    constructor(
      private store: Store,
      private activatedRoute: ActivatedRoute
    ) {
    }
    
    ngOnInit(){
      this.bindForm();
    }

    bindForm(){
        this.formlyGroup = new FormlyTypeGroup<IAdminPageCreateForm>({
        SomeField: new FieldTypes.InputField('SomeField'),
      })
    }
    
    onCancel() {
      // do something...
      //const PageTypeId = this.activatedRoute.snapshot.params['dashboardPageId'];
      //const RequestId = this.activatedRoute.snapshot.params['pageDetailId'];
      //this.store.dispatch(new Navigate([`main/fos/details/request-detail/$/$`]));
    }

    formSubmit($event) {
      this.formlyGroup.markAsBusy();
      const model = {...this.formlyGroup.model}
      //this.store.dispatch(new NgxsAction(model));
    }
  
  } 
