
import { State, Action, StateContext, Store, Selector } from '@ngxs/store'
import { IPostStateModel } from './posts.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CreatePostAction, SetPostAsDoneAction, GetPostsAction, SetPostsAction, SetPostAsLoadingAction, GetPostPageAction, PostNextPage, PostPrevPage } from './posts.actions';
import { from, Subscription, of } from 'rxjs';
import { tap, mergeMap, delay, catchError } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { AuthState } from '../auth/auth.state';
import { IPostFirebaseModel } from '../../schemas/posts/post.model';
import { FirebasePaginationStateModel } from '../../firebase/types/firabes-pagination';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { Logger } from '../../utils/logger';
import { PostFireStore } from '../../schemas/posts/post.firebase';

@State({
    name: 'postState',
    defaults: <IPostStateModel>{
        working: false,
        posts: [],
        size: 0,
        paginationState: new FirebasePaginationStateModel<IPostFirebaseModel>()
    }
})
export class PostState {

    private posts: PostFireStore;
    private GetPostSubscription: Subscription;
    constructor(
        angularFireStore: AngularFirestore,
        private store: Store,
        private snackBarStatus: SnackbarStatusService
    ) {
        this.posts = new PostFireStore(angularFireStore);
    }

    @Selector()
    static IsLoading(state: IPostStateModel) {
        return state.working;
    }

    @Selector()
    static getItems(state: IPostStateModel) {
        return state.posts;
    }

    @Selector()
    static getPage(state: IPostStateModel) {
        return state.paginationState.items;
    }
    @Selector()
    static getNextEnabled(state: IPostStateModel) {
        return state.paginationState.next;
    }
    @Selector()
    static getPreviousEnabled(state: IPostStateModel) {
        return state.paginationState.prev;
    }

    @Action(SetPostAsLoadingAction)
    onPostAsworking(ctx: StateContext<IPostStateModel>) {
        ctx.patchState({
            working: true
        });
    }

    @Action(SetPostAsDoneAction)
    onPostAsDone(ctx: StateContext<IPostStateModel>) {
        ctx.patchState({
            working: false
        })
    }

    @Action(CreatePostAction)
    onCreatePost(ctx: StateContext<IPostStateModel>, action: CreatePostAction) {

        return this.store.selectOnce(AuthState.getUser).pipe(
            mergeMap((user) => {
                const form = { ...action.request };
                form.createDate = Date.now();
                form.createdBy = user;
                return from(this.posts.create(form))
            }),
            tap(() => {
                this.snackBarStatus.OpenComplete('Post succesfully created');
                ctx.dispatch(new Navigate(['admin/posts/list']))
            })
        );

    }

    @Action(GetPostsAction)
    onGetPost(ctx: StateContext<IPostStateModel>, action: GetPostsAction) {

        if (!this.GetPostSubscription) {
            ctx.dispatch(new SetPostAsLoadingAction())
            this.GetPostSubscription = this.posts.collection$(ref => ref.orderBy('createDate',  'desc')).pipe(
                tap(items => {
                    ctx.dispatch(new SetPostsAction(items))
                }),
                delay(250),
                mergeMap(() => ctx.dispatch(new SetPostAsDoneAction()))
            ).subscribe();
        }
    }

    @Action(SetPostsAction)
    onSetPost(ctx: StateContext<IPostStateModel>, action: SetPostsAction) {
        const posts = action.request;
        const size = posts.length;
        ctx.patchState({ posts, size });
    }

    @Action(GetPostPageAction)
    onGetPostPage(ctx: StateContext<IPostStateModel>, action: GetPostPageAction) {

        const { paginationState } = ctx.getState();
        const { pageSize, orderByField } = paginationState;
        if (!this.GetPostSubscription) {
            ctx.dispatch(new SetPostAsLoadingAction());
            this.GetPostSubscription = this.posts.collection$(ref => ref.limit(pageSize).orderBy(orderByField, 'desc')).pipe(
                tap(model => {
                    if (!model.length) {
                        return false;
                    }
                    const first = model[0][orderByField];
                    const last = model[model.length - 1][orderByField];
                    const pagination_count = 0;
                    const next = model.length === pageSize;
                    const prev = false;
                    const prevStartAt = [first];
                    const newPaginationState = { ...paginationState, first, last, pagination_count, next, prev, prev_start_at: prevStartAt, items: model };
                    ctx.patchState({ paginationState: newPaginationState })
                }),
                mergeMap(() => ctx.dispatch(new SetPostAsDoneAction()))
            ).subscribe();
        }
    }

    @Action(PostNextPage)
    onNextPage(ctx: StateContext<IPostStateModel>, action: PostNextPage) {

        const { paginationState } = ctx.getState();
        let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
        return this.posts.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
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

    @Action(PostPrevPage)
    onPreviousPage(ctx: StateContext<IPostStateModel>) {
        const { paginationState } = ctx.getState();
        let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
        return this.posts.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
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
                    return of("INCORRECT_SEQUENCE_ERROR")
                })
            )
    }
}
