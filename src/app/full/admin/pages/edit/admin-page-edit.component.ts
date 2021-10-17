import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { PageState } from '@states/pages/pages.state';
import { IPageFirebaseModel } from '@firebase-schemas/pages/page.model';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'admin-page-edit',
    templateUrl: 'admin-page-edit.component.html',
    styleUrls: [`admin-page-edit.component.scss`]
  })
export class AdminPageEditComponent implements OnInit {

  @Select(PageState.getCurrenSelectedRecord) record$: Observable<IPageFirebaseModel>;

  formlyGroup: FormlyTypeGroup<IPageFirebaseModel>;
  title = 'Edit Page';
  listPath = "/admin/pages";

  btnReadyLabel = 'Update';
  btnLoadingLabel = 'Updating...';
  subscriptions: Subscription[] = [];

    constructor(
      private store: Store
    ) {}

  ngOnInit() {

    this.formlyGroup = new FormlyTypeGroup<IPageFirebaseModel>({
      url: new FieldTypes.FriendlyUrlField('Url', true, 100),
      title: new FieldTypes.InputField('Title', true, 100),
      body: new FieldTypes.MatEditor('Body', true, 100)
    });

    this.bind();
  }
  bind() {

    const value$ = this.record$.pipe(
      filter(_ => !!_),
      tap(({ Id, url, title, body }) => {
        console.log({ Id, url, title, body });
        this.formlyGroup.setModel({ Id, url, title, body })
      })
    );

    this.subscriptions = [...this.subscriptions, value$.subscribe()];

  }
  
  } 
