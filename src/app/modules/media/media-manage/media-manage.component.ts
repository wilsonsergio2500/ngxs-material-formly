import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagesOnResizerState } from '../../../states/media/images-on-resizer/images-on-resizer.state'
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { FormTypeBuilder } from '../../form-type-builder/form-type-builder.service';
import { NgTypeFormGroup, NgTypeFormControl } from '../../form-type-builder/form-type-builder.model';
import { IImageLookUp } from '../contracts/image-lookup';
import { MatDialog } from '@angular/material/dialog';
import { ImagesOnResizerLookupTagChangeAction, ImagesOnResizerSearchAction, ImagesOnResizerNextPageAction, ImagesOnResizerPreviousPageAction, ImagesOnResizerRemoveImageAction } from '../../../states/media/images-on-resizer/images-on-resizer.actions';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MediaImageDialogComponent } from '../media-image-dialog/media-image-dialog.component';
import { IImageResizerFirebaseModel } from '../../../schemas/images/image-resizer.model';
import { IImagesOnResizerRemoveRequest } from '../../../states/media/images-on-resizer/images-on-resizer.model';
import { ModeType } from '../contracts/media-mode-types';

@Component({
  selector: 'media-manage',
  templateUrl: 'media-manage.component.html',
  styleUrls: [`media-manage.component.scss`]
})
export class MediaManageComponent implements OnInit {

  @Select(ImagesOnResizerState.IsLoading) working$: Observable<boolean>;
  @Select(ImagesOnResizerState.getImageLookUpTags) tags$: Observable<string[]>
  @Select(ImagesOnResizerState.IsSearching) searching$: Observable<string[]>
  @Select(ImagesOnResizerState.getPage) pageItems$: Observable<IImageResizerFirebaseModel[]>;

  @Select(ImagesOnResizerState.getNextEnabled) next$: Observable<boolean>;
  @Select(ImagesOnResizerState.getPreviousEnabled) prev$: Observable<boolean>;
  @Select(ImagesOnResizerState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;

  @Input() modeType: ModeType = "Presenter"

  form: NgTypeFormGroup<IImageLookUp>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  onSearchTags$: Subscription;
  // perhaps implemnt in next version
  enableSearch = false;

  @Output() onImageSelect = new EventEmitter<string>();

  constructor(
    private store: Store,
    private formTypeBuilder: FormTypeBuilder,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit() {

    const tagValidator = (c: NgTypeFormControl<string[], IImageLookUp>) => {
      if (c && c.value && c.value.length > 0) {
        return null;
      }
      return { required: true }
    }

    this.form = this.formTypeBuilder.group<IImageLookUp>({
      tags: [null, [tagValidator]]
    });

    this.onSearchTags$ = this.form.get('tags').valueChanges.subscribe(this.onSearchTagsChange.bind(this));
  }

  onSearchTagsChange(tags: string[]) {
    this.store.dispatch(new ImagesOnResizerLookupTagChangeAction([...tags]));
  }

  clear() {
    //this.store.dispatch(new ImagesOnResizerClearLookupTagAction())
  }
  search() {
    this.store.dispatch(new ImagesOnResizerSearchAction())
  }
  onAdd() {
    const dialogRef = this.matDialog.open(MediaImageDialogComponent, { panelClass: 'dialog-responsive', disableClose: true });
  }

  onNextPage() {
    this.store.dispatch(new ImagesOnResizerNextPageAction());
  }
  onPrevPage() {
    this.store.dispatch(new ImagesOnResizerPreviousPageAction());
  }
  onRemove(request: IImagesOnResizerRemoveRequest) {
    this.store.dispatch(new ImagesOnResizerRemoveImageAction(request))
  }

  onSelect(imgPath: string) {
    if (this.onImageSelect) {
      this.onImageSelect.emit(imgPath);
    }
  }

} 
