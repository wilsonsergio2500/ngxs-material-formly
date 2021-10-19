import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { PageCreateAction } from '@states/pages/pages.actions';

@Component({
  selector: 'admin-page-create',
  templateUrl: 'admin-page-create.component.html',
  styleUrls: [`admin-page-create.component.scss`]
})
export class AdminPageCreateComponent implements OnInit {

  formlyGroup: FormlyTypeGroup<IPageFirebaseModel>;

  title = 'Pages';
  btnReadyLabel = 'Add';
  btnLoadingLabel = 'Adding...';
  listPath = "/admin/pages";


  constructor(
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.bindForm();
  }

  bindForm() {
    this.formlyGroup = new FormlyTypeGroup<IPageFirebaseModel>({
      url: new FieldTypes.FriendlyUrlField('Url', true, 60, { templateOptions: { fxFlexXs: 60 } }),
      publish: new FieldTypes.ToogleField('Publish', 40, { templateOptions: { fxFlexXs: 40 } }),
      title: new FieldTypes.InputField('Title', true, 100),
      body: new FieldTypes.MatEditor('Body', true, 100)
    })
  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    const model = { ...this.formlyGroup.model }
    this.store.dispatch(new PageCreateAction(model))
  }

}
