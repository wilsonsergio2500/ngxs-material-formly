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
  @HostBinding() id = `${SELECTOR}-${nextUniqueId++}`
  editorCreated$: Subscription;

  static ngAcceptInputType_disabled: boolean | string | null | undefined
  static ngAcceptInputType_required: boolean | string | null | undefined

  private firebaseGalleryService: FirebaseImageManageDialogService

  ngOnInit() {
    this.editorCreated$ = this.onEditorCreated.pipe(tap(q => this.editorCreated(q))).subscribe();
    this.firebaseGalleryService = this.injector.get(FirebaseImageManageDialogService);

  }

  editorCreated(quill) {
    console.log(quill);
  }

  ngOnDestroy() {
    if (this.editorCreated$) {
      this.editorCreated$.unsubscribe();
    }
    super.ngOnDestroy();
  }

  onImage() {
    console.log(this.quillEditor);
  }


}
