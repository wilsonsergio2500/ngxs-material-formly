import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core'
import { MatFormFieldControl } from '@angular/material/form-field';
import { tap } from 'rxjs/operators'
import { _MatQuillBase } from './mat-quill-base'

import Quill from 'quill'
import { ImageResize } from './extensions/ImageResize/imageResize'
import { Subscription } from 'rxjs';
import { FirebaseImageManageDialogService } from '../firebase-image-manager/firebase-image-manage-dialog-service/firebase-image-manage-dialog.service';
Quill.register('modules/imageResize', ImageResize)

let nextUniqueId = 0
const SELECTOR = 'mat-editor'

@Component({
  selector: SELECTOR,
  templateUrl: 'mat-editor.component.html',
  styleUrls: [`mat-editor.component.scss`],
  inputs: ['disabled'],
  providers: [{ provide: MatFormFieldControl, useExisting: MatEditorComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatEditorComponent extends _MatQuillBase {

  controlType = SELECTOR;
  @Input() theme = 'bubble';
  @Input() displaySideBar = true;
  @HostBinding() id = `${SELECTOR}-${nextUniqueId++}`;
  subscriptions: Subscription[] = [];

  static ngAcceptInputType_disabled: boolean | string | null | undefined
  static ngAcceptInputType_required: boolean | string | null | undefined

  private firebaseGalleryService: FirebaseImageManageDialogService
  private editor;

  ngOnInit() {
    const editorCreated$ = this.onEditorCreated.pipe(tap(q => this.editorCreated(q)));
    this.firebaseGalleryService = this.injector.get(FirebaseImageManageDialogService);

    this.subscriptions = [...this.subscriptions, editorCreated$.subscribe()];

  }

  editorCreated(quill) {
    //this.editor = quill.editor;
    //console.log(this.editor);
    //console.log(quill);
  }

  onImage() {
    const index = this.quillEditor.getSelection()?.index ?? 0;
    const onImageSelect$ = this.firebaseGalleryService.OnOpen().pipe(
      tap(_ => {
        this.quillEditor.insertEmbed(index, 'image', _, 'user');
      })
    );
    this.subscriptions = [...this.subscriptions, onImageSelect$.subscribe()];
  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
    super.ngOnDestroy();
  }

}
