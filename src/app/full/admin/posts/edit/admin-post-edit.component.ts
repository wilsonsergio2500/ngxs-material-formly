import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { IPostFirebaseModel } from '@firebase-schemas/posts/post.model';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { PostState } from '@states/posts/posts.state';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { PostUpdateAction } from '@states/posts/posts.actions';

@Component({
  selector: 'admin-post-edit',
  templateUrl: 'admin-post-edit.component.html',
  styleUrls: [`admin-post-edit.component.scss`]
})
export class AdminPostEditComponent implements OnInit, OnDestroy {

  @Select(PostState.IsLoading) working$: Observable<boolean>;
  @Select(PostState.getCurrenSelectedRecord) record$: Observable<IPostFirebaseModel>;

  formlyGroup: FormlyTypeGroup<IPostFirebaseModel>;
  title = 'Posts';
  btnReadyLabel = 'Update';
  btnLoadingLabel = 'Updating...';
  listPath = "/admin/posts";
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {

    this.formlyGroup = new FormlyTypeGroup<IPostFirebaseModel>({
      url: new FieldTypes.FriendlyUrlField('Url', true, 60, { templateOptions: { fxFlexXs: 60 } }),
      publish: new FieldTypes.ToogleField('Publish', 40, { templateOptions: { fxFlexXs: 40 } }),
      title: new FieldTypes.InputField('Title', true, 100),
      image: new FieldTypes.FirebaseImageGalleryUploader('Post Image', true, 100),
      excerpt: new FieldTypes.MatEditor('Excerpt', true, 100, { placeholder: 'Insert excerpt here...', hasSideBar: false }),
      body: new FieldTypes.MatEditor('Body', true, 100, { placeholder: 'Insert post here...' })
    });

    const value$ = this.record$.pipe(
      filter(_ => !!_),
      tap(({ Id, url, title, body, publish, image, excerpt }) => {
        this.formlyGroup.setModel({ Id, url, title, body, publish, image, excerpt })
      })
    );

    this.subscriptions = [...this.subscriptions, value$.subscribe()];

  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new PostUpdateAction({ ...this.formlyGroup.model }));
  }


  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }



}
