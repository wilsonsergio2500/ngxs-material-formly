import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { IImagesOnResizerStateModel } from './images-on-resizer.model';
import { ImagesOnResizerDoneAction, ImagesOnResizerLoadingAction, ImagesOnResizerCreateAction, ImagesOnResizerLoadAction, ImagesOnResizerNextPageAction, ImagesOnResizerPreviousPageAction, ImagesOnResizerLookupTagChangeAction, ImagesOnResizerSetAsSearchingAction, ImagesOnResizerSetSearchingAsDoneAction, ImagesOnResizerSearchAction, ImagesOnResizerRemoveImageAction, ImagesOnResizerFirstPageAction } from './images-on-resizer.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { ImageResizeFireStore } from '../../../schemas/images/image-resizer.firebase';
import { Subscription, from, of } from 'rxjs';
import { SnackbarStatusService } from '../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '../../auth/auth.state';
import { FirebasePaginationStateModel } from '../../../firebase/types/firabes-pagination';
import { IImageResizerFirebaseModel } from '../../../schemas/images/image-resizer.model';
import { Logger } from '../../../utils/logger';
import { ConfirmationDialogService } from '../../../components/ui-elements/confirmation-dialog/confirmation-dialog.service';
import { StringHelpers } from '../../../utils/string-helpers';
import { FILE_BASE_PATH, ImageResizeIoAPI } from '../../../modules/image-resizer-io/lib-api/image-resizer-io-api';
import { Injectable } from '@angular/core';


@State<IImagesOnResizerStateModel>({
  name: 'imagesOnResizer',
  defaults: <IImagesOnResizerStateModel>{
    loading: false,
    paginationState: new FirebasePaginationStateModel<IImageResizerFirebaseModel>(20),
    lookUpTags: [],
    searching: false
  }
})
@Injectable()
export class ImagesOnResizerState {

  private schema: ImageResizeFireStore;
  private subscription: Subscription;
  constructor(
    private store: Store,
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService,
    private angularFireStore: AngularFirestore

  ) {
    this.schema = new ImageResizeFireStore(angularFireStore);
  }

  @Selector()
  static IsLoading(state: IImagesOnResizerStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getPage(state: IImagesOnResizerStateModel) {
    return state.paginationState.items;
  }
  @Selector()
  static getNextEnabled(state: IImagesOnResizerStateModel): boolean {
    return state.paginationState.next;
  }
  @Selector()
  static getPreviousEnabled(state: IImagesOnResizerStateModel): boolean {
    return state.paginationState.prev;
  }
  @Selector()
  static IsPaginatorEnabled(state: IImagesOnResizerStateModel): boolean {
    return state.paginationState.prev || state.paginationState.next;
  }

  @Selector()
  static getImageLookUpTags(state: IImagesOnResizerStateModel) {
    return state.lookUpTags;
  }
  @Selector()
  static IsSearching(state: IImagesOnResizerStateModel) {
    return state.searching;
  }

  @Action(ImagesOnResizerDoneAction)
  onDone(ctx: StateContext<IImagesOnResizerStateModel>) {
    ctx.patchState({
      loading: false
    });
  }
  @Action(ImagesOnResizerLoadingAction)
  onLoading(ctx: StateContext<IImagesOnResizerStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(ImagesOnResizerCreateAction)
  onCreate(ctx: StateContext<IImagesOnResizerStateModel>, action: ImagesOnResizerCreateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const form = { ...action.request };
        form.createDate = Date.now();
        form.createdBy = user;
        return from(this.schema.create(form));
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Image succesfully added');
        //naviage to view
      })
    )
  }

  @Action(ImagesOnResizerLoadAction)
  onLoad(ctx: StateContext<IImagesOnResizerStateModel>) {

    const { paginationState } = ctx.getState();
    const { pageSize, orderByField } = paginationState;
    if (!this.subscription) {
      ctx.dispatch(new ImagesOnResizerLoadingAction());
      this.subscription = this.schema.collection$(ref => ref.limit(pageSize).orderBy(orderByField, 'desc')).pipe(
        tap(model => {
          if (!model.length) {
            return false;
          }
          const begining = model[0][orderByField];;
          const first = model[0][orderByField];
          const last = model[model.length - 1][orderByField];
          const pagination_count = 0;
          const next = model.length === pageSize;
          const prev = false;
          const prevStartAt = [first];
          const newPaginationState = { ...paginationState, begining, first, last, pagination_count, next, prev, prev_start_at: prevStartAt, items: model };
          ctx.patchState({ paginationState: newPaginationState })
        }),
        mergeMap(() => ctx.dispatch(new ImagesOnResizerDoneAction()))
      ).subscribe();
    }

  }

  @Action(ImagesOnResizerFirstPageAction)
  onGoToFirstPage(ctx: StateContext<IImagesOnResizerStateModel>) {
    const { paginationState } = ctx.getState();
    const { pageSize, orderByField, begining } = paginationState;
    return this.schema.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAt(begining))
      .get().pipe(
        tap(models => {
          const currentSize = models.docs.length;
          const next = currentSize === pageSize;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          const pagination_count = 0;
          const prev = pagination_count != 0;
          const prev_start_at = [first];
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Post[Page:${pagination_count + 1}]`, items);
        })
      )
  }

  @Action(ImagesOnResizerNextPageAction)
  onNextPage(ctx: StateContext<IImagesOnResizerStateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
    return this.schema.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
      .get().pipe(
        tap(models => {
          const currentSize = models.docs.length;
          let next = currentSize === pageSize;
          const prev = true;
          if (!currentSize) {
            next = false;
            return;
          }
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count++;
          const prevStartAt = [...prev_start_at, first];
          const newPaginationState = { ...paginationState, next, first, last, items, pagination_count, prev_start_at: prevStartAt, prev };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Post[Page:${pagination_count + 1}]`, items);

        })
        , catchError(error => {
          const newPaginationState = { ...paginationState, next: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      );
  }

  @Action(ImagesOnResizerPreviousPageAction)
  onPreviousPage(ctx: StateContext<IImagesOnResizerStateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
    return this.schema.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
      .get().pipe(
        tap(models => {
          const next = true;
          const currentSize = models.docs.length;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count--;
          const prev = pagination_count != 0;
          prev_start_at = prev_start_at.slice(0, prev_start_at.length - 1);
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Post[Page:${pagination_count + 1}]`, items);
        }),
        catchError(error => {
          const newPaginationState = { ...paginationState, prev: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      )
  }

  @Action(ImagesOnResizerLookupTagChangeAction)
  onTagChanged(ctx: StateContext<IImagesOnResizerStateModel>, action: ImagesOnResizerLookupTagChangeAction) {
    const { tags: lookUpTags } = action;
    ctx.patchState({ lookUpTags });
  }

  @Action(ImagesOnResizerSetAsSearchingAction)
  onSearching(ctx: StateContext<IImagesOnResizerStateModel>) {
    ctx.patchState({ searching: true });
  }

  @Action(ImagesOnResizerSetSearchingAsDoneAction)
  onSearchingDone(ctx: StateContext<IImagesOnResizerStateModel>) {
    ctx.patchState({ searching: false })
  }

  @Action(ImagesOnResizerSearchAction)
  onSearch(ctx: StateContext<IImagesOnResizerStateModel>) {
    ctx.dispatch(new ImagesOnResizerSetAsSearchingAction());
  }

  @Action(ImagesOnResizerRemoveImageAction)
  onRemoveImage(ctx: StateContext<IImagesOnResizerStateModel>, action: ImagesOnResizerRemoveImageAction) {
    const { Id, Image } = action.request;
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this image').pipe(
      mergeMap(() => from(this.schema.delete(Id))),
      mergeMap(() => {
        const resizeIoId = StringHelpers.ExtractSubstring(Image, FILE_BASE_PATH);
        return from(ImageResizeIoAPI.Delete(resizeIoId));
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Image has been removed');
      }),
      mergeMap(() => {
        return ctx.dispatch(new ImagesOnResizerFirstPageAction())
      })

    )
  }

}
