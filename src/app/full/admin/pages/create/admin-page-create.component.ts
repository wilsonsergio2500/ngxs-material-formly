import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormlyTypeGroup } from '../../../../modules/formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { PageCreateAction } from '../../../../states/pages/pages.actions';
import { QuillEditorComponent } from 'ngx-quill'
import { MatQuill } from '../../../../modules/mat-quill/mat-quill';
import { MediaManageDialogService } from '../../../../modules/media/media-manage-dialog-service/media-manage-dialog.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'admin-page-create',
  templateUrl: 'admin-page-create.component.html',
  styleUrls: [`admin-page-create.component.scss`]
})
export class AdminPageCreateComponent implements OnInit {
  @ViewChild(MatQuill, { static: false }) editor: MatQuill

  formlyGroup: FormlyTypeGroup<IPageFirebaseModel>;

  title: string = 'New Page';
  btnReadyLabel = 'Update';
  btnLoadingLabel = 'Updating...';
  componentTitle = 'Admin Page Create Title';
  listPath = "../list"

  constructor(
    private store: Store,
    private imageDialogService: MediaManageDialogService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.bindForm();
  }

  bindForm() {
    this.formlyGroup = new FormlyTypeGroup<IPageFirebaseModel>({
      url: new FieldTypes.FriendlyUrlField('Url', true, 100),
      title: new FieldTypes.InputField('Title', true, 100),
      body: new FieldTypes.TextArea('Body', true, 100)
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
    const model = { ...this.formlyGroup.model }
    this.store.dispatch(new PageCreateAction(model))
  }

  onQuillEditorCreated() {
    const toolbar = this.editor.quillEditor.getModule('toolbar');
    toolbar.addHandler('image', this.onImageHandle.bind(this));
  }

  onImageHandle() {

    const index = this.editor.quillEditor.getSelection()?.index ?? 0;

    const onSelectImage$ = this.imageDialogService.OnOpen().pipe(
      tap(url => {
        this.editor.quillEditor.insertEmbed(index, 'image', url, 'user');
      })
    );

    onSelectImage$.subscribe();
  }

}
