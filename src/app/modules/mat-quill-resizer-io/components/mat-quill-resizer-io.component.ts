import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core'
import { MatFormFieldControl } from '@angular/material/form-field'
import { _MatQuillBase } from '../../mat-quill/mat-quill-base'

let nextUniqueId = 0
const SELECTOR = 'mat-quill-resizer-io'

@Component({
  selector: SELECTOR,
  templateUrl: 'mat-quill-resizer-io.component.html',
  inputs: ['disabled'],
  providers: [{ provide: MatFormFieldControl, useExisting: MatQuillImgResizer }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatQuillImgResizer extends _MatQuillBase {

  controlType = SELECTOR
  @HostBinding() id = `${SELECTOR}-${nextUniqueId++}`

  static ngAcceptInputType_disabled: boolean | string | null | undefined
  static ngAcceptInputType_required: boolean | string | null | undefined


}
