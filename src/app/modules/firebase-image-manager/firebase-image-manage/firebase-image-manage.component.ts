import { Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IImageFirebaseModel } from '@firebase-schemas/images/image.model';
import { ImagesState } from '@states/images/images.state';
import { FirebaseImageUploaderService } from '../firebase-image-uploader-service/firebase-image-uploader.service';
import { IImagesRemoveRequest } from '@states/images/images.model';
import { ImagesLoadNextPageAction, ImagesLoadPreviousPageAction, ImagesRemoveAction } from '@states/images/images.actions';

export type GALLERY_DISPLAY_TYPE = "PRESENTER" | "SELECTION";

@Component({
    selector: 'firebase-image-manage',
    templateUrl: 'firebase-image-manage.component.html',
    styleUrls: [`firebase-image-manage.component.scss`]
  })
  export class FirebaseImageManageComponent implements OnDestroy {

  @Select(ImagesState.IsLoading) working$: Observable<boolean>;
  @Select(ImagesState.getPage) pageItems$: Observable<IImageFirebaseModel[]>;

  @Select(ImagesState.getNextEnabled) next$: Observable<boolean>;
  @Select(ImagesState.getPreviousEnabled) prev$: Observable<boolean>;
  @Select(ImagesState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;
  @Output() onSelectImage = new EventEmitter<string>(null);
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private uploadService: FirebaseImageUploaderService
    ) {
    }

  onAdd() {
    const onUp$ = this.uploadService.OnOpen().pipe(
      tap(path => {
        console.log(path);
      })
    );

    this.subscriptions = [...this.subscriptions, onUp$.subscribe()];

  }

  removeImage($event: IImagesRemoveRequest) {
    this.store.dispatch(new ImagesRemoveAction($event));
  }

  onNextPage() {
    this.store.dispatch(new ImagesLoadNextPageAction())
  }

  onPrevPage() {
    this.store.dispatch(new ImagesLoadPreviousPageAction());
  }

  imageSelected($event) {
    this.onSelectImage.emit($event);
  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
  
  } 
