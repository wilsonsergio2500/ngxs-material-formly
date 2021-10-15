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

import Quill from 'quill'

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

  displaySideBar: boolean = false;

  modules = {
    //'emoji-shortname': true,
    //'emoji-textarea': true,
    //'emoji-toolbar': true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
  /*    ['image', 'code-block']*/
    ],
    'imageResize': {}
  }

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
      body: new FieldTypes.MatEditor('Body', true, 100)
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
    //console.log(this.editor);
  /*  console.log(this.editor.quillEditor);*/
    const toolbar = this.editor.quillEditor.getModule('toolbar');
    toolbar.addHandler('image', this.onImageHandle.bind(this));
    this.addSideBarControlHandler();
  }
  addSideBarControlHandler() {
    let Block = Quill.import('blots/block');
    const editor = this.editor.quillEditor;
    editor.on(Quill.events.EDITOR_CHANGE, (eventType, range) => {
      if (eventType !== Quill.events.SELECTION_CHANGE) return;
      if (range == null) return;
      if (range.length === 0) {
        let [block, offset] = editor.scroll.descendant(Block, range.index);
        if (block != null && block.domNode.firstChild instanceof HTMLBRElement) {
          /* let lineBounds = editor.getBounds(range);*/
          /* console.log(lineBounds);*/
          this.displaySideBar = true;

        } else {
          this.displaySideBar = false;
        }

      } else {
        this.displaySideBar = false;
      }

    })
  }

  onCamera() {
      //const toolbar = this.editor.quillEditor.getModule('toolbar');
      //console.log(toolbar);
      //console.log(this.editor);
      //console.log(this.editor.quillEditor);
    this.onImageHandle();
  }
  onVideo() {
  }

  doAction(event: any) {
    console.log(event);
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
