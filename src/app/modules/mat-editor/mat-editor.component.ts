import { Component, HostBinding, Input, ViewChild } from '@angular/core'
import { MatFormFieldControl } from '@angular/material/form-field';
import Quill from 'quill'
import { tap } from 'rxjs/operators'
import { _MatQuillBase } from './mat-quill-base'
import { ImageResize } from './extensions/ImageResize/imageResize'
import { DividerBlot } from './extensions/Divider/divider';
import { Subscription } from 'rxjs';
import { FirebaseImageManageDialogService } from '../firebase-image-manager/firebase-image-manage-dialog-service/firebase-image-manage-dialog.service';
import { ImageFormat } from './extensions/ImageFormats/image-formats';
import { MatFabSpeedDialComponent } from '../mat-fab-speed-dial/mat-fab-speed-dial.component';
Quill.register('modules/imageResize', ImageResize)
Quill.register(ImageFormat, true);
Quill.register(DividerBlot);

let nextUniqueId = 0
const SELECTOR = 'mat-editor'

@Component({
  selector: SELECTOR,
  templateUrl: 'mat-editor.component.html',
  styleUrls: [`mat-editor.component.scss`],
  inputs: ['disabled'],
  providers: [{ provide: MatFormFieldControl, useExisting: MatEditorComponent }],
})
export class MatEditorComponent extends _MatQuillBase {

  controlType = SELECTOR;
  @Input() theme = 'bubble';
  @Input() modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
    ],
    'imageResize': {}
  }
  @Input() hasSideBar = true;
  @Input() placeholder = 'Insert Text here...';
  @HostBinding() id = `${SELECTOR}-${nextUniqueId++}`;
  displaySideBar = false;
  subscriptions: Subscription[] = [];
  @ViewChild(MatFabSpeedDialComponent) speedDialSideBar : MatFabSpeedDialComponent;

  static ngAcceptInputType_disabled: boolean | string | null | undefined
  static ngAcceptInputType_required: boolean | string | null | undefined

  private firebaseGalleryService: FirebaseImageManageDialogService;

  ngOnInit() {
    const editorCreated$ = this.onEditorCreated.pipe(tap(q => this.editorCreated(q)));
    this.firebaseGalleryService = this.injector.get(FirebaseImageManageDialogService);
    this.subscriptions = [...this.subscriptions, editorCreated$.subscribe()];
  }

  editorCreated(quill) {
    this.addPasteHanlder();
    this.addSideBarControlHandler();
  }
  private addSideBarControlHandler() {
    const Block = Quill.import('blots/block');
    const editor = this.quillEditor;
    editor.on(Quill.events.EDITOR_CHANGE, (eventType, range) => {
      if (eventType !== Quill.events.SELECTION_CHANGE) return;
      if (range == null) return;
      if (range.length === 0) {
        let [block,] = editor.scroll.descendant(Block, range.index);
        if (block != null && block.domNode.firstChild instanceof HTMLBRElement) {
          const lineBounds = editor.getBounds(range);
          this.setSideBarLocation(lineBounds);
          this.displaySideBar = true;
        } else {
          this.displaySideBar = false;
        }

      } else {
        this.displaySideBar = false;
      }
    })

  }

  private addPasteHanlder() {
    const editor = this.quillEditor;
    editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = []
      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert
          })
        }
      })
      delta.ops = ops
      return delta
    })
  }

  onImage() {
    const index = this.quillEditor.getSelection()?.index ?? 0;
    const onImageSelect$ = this.firebaseGalleryService.OnOpen().pipe(
      tap(_ => {
        this.quillEditor.insertEmbed(index, 'image', _, Quill.sources.USER);
        this.quillEditor.setSelection(index + 1, Quill.sources.SILENT);
      })
    );
    this.subscriptions = [...this.subscriptions, onImageSelect$.subscribe()];
  }

  onCode() {
    const index = this.quillEditor.getSelection()?.index ?? 0;
    const length = this.quillEditor.getLength();
    this.quillEditor.formatLine(index, length, { 'code-block': true });
    this.quillEditor.insertEmbed(index + 1, 'break', true, Quill.sources.USER);
  }

  onDivider() {
    const index = this.quillEditor.getSelection()?.index ?? 0;
    this.quillEditor.insertEmbed(index, 'divider', true, Quill.sources.USER);
    this.quillEditor.setSelection(index + 1, Quill.sources.SILENT);
  }

  private setSideBarLocation(pos: { top: number }) {
    if (this.hasSideBar && this.speedDialSideBar) {
      const { elementRef } = this.speedDialSideBar;
      this.changeElementStyle(elementRef.nativeElement, 'top', `${Math.round(pos.top) - 10}px`);
    }
  }

  private changeElementStyle(elem: any, style: string, value: string | number) {
    this.renderer.setStyle(elem, style, value);
  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
    super.ngOnDestroy();
  }

}
