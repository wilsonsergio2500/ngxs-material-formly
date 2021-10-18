import { Component, OnInit } from '@angular/core';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { Store } from '@ngxs/store';
import { CreatePostAction } from '@states/posts/posts.actions';
import { IPostFirebaseModel } from '@firebase-schemas/posts/post.model';

@Component({
  selector: 'admin-post-create',
  templateUrl: 'admin-post-create.component.html',
  styleUrls: ['admin-post-create.component.scss']
})
export class AdminPostCreateComponent implements OnInit {

  formlyGroup: FormlyTypeGroup<IPostFirebaseModel>;

  listPath = "/admin/posts";
  title = 'Posts';

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit() {

    this.formlyGroup = new FormlyTypeGroup<IPostFirebaseModel>({
      url: new FieldTypes.FriendlyUrlField('Url', true, 60, { templateOptions: { fxFlexXs: 60 } }),
      publish: new FieldTypes.ToogleField('Publish', 40, { className: 'post-publish-toogle', templateOptions: { fxFlexXs: 40 } }),
      title: new FieldTypes.InputField('Title', true, 100),
      image: new FieldTypes.FirebaseImageUploader('Image', true, 100),
      excerpt: new FieldTypes.MatEditor('Excerpt', true, 100, { placeholder: 'Insert excerpt here...', hasSideBar: false }),
      body: new FieldTypes.MatEditor('Body', true, 100, { placeholder: 'Insert post here...'})
    });
  }


  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new CreatePostAction({ ...this.formlyGroup.model }))

  }

}
