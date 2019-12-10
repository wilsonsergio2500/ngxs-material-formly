
import { State, Action, StateContext, Store, Selector } from '@ngxs/store'
import { IPostStateModel } from './posts.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostFireStore } from '../../../../schemas/posts/post.firebase';
import { CreatePostAction, SetPostAsDoneAction, GetPostsAction, SetPostsAction, SetPostAsLoadingAction, GetPostPageAction, PostNextPage } from './posts.actions';
import { SnackbarStatusService } from '../../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { from, Subscription, of } from 'rxjs';
import { tap, mergeMap, delay, catchError } from 'rxjs/operators';
import { AuthState } from '../../../../xs-ng/auth/auth.state';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationStateModel } from '../../../../firebase/types/firabes-pagination';
import { IPostFirebaseModel } from '../../../../schemas/posts/post.model';

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
        const { pageSize } = paginationState;
        if (!this.GetPostSubscription) {
            ctx.dispatch(new SetPostAsLoadingAction());
            this.GetPostSubscription = this.posts.queryCollection(ref => ref.limit(pageSize).orderBy('createDate', 'desc'))
                .snapshotChanges().pipe(
                    tap(models => {
                        console.log('here');
                        if (!models.length) {
                            return false;
                        }

                        const first = models[0].payload.doc.id
                        const last = models[models.length - 1].payload.doc.id;

                        let items = [];
                        for (let item of models) {
                            items.push(item.payload.doc.data());
                        }
                        const prev_start_at = [first];
                        const pagination_count = 0;
                        const next = false;
                        const prev = false;
                        const newPaginationState = { ...paginationState, first, last, pagination_count, next, prev, prev_start_at: prev_start_at, items };
                        ctx.patchState({ paginationState: newPaginationState })

                    }),
                    mergeMap(() => ctx.dispatch(new SetPostAsDoneAction()))
                ).subscribe();
            //this.GetPostSubscription = this.posts.collection$(ref => ref.limit(pageSize).orderBy('createDate', 'desc')).pipe(
            //    tap(model => {
            //        if (!model.length) {
            //            return false;
            //        }

            //        const first = model[0].Id;
            //        const last = model[model.length - 1].Id;
            //        const pagination_count = 0;
            //        const next = false;
            //        const prev = false;
            //        const prevStartAt = [...prev_start_at, first];
            //        const newPaginationState = { ...paginationState, first, last, pagination_count, next, prev, prev_start_at: prevStartAt, items: model };
            //        ctx.patchState({ paginationState: newPaginationState })
            //    }),
            //    mergeMap(() => ctx.dispatch(new SetPostAsDoneAction()))
            //).subscribe();
        }
    }

    @Action(PostNextPage)
    onNextPage(ctx: StateContext<IPostStateModel>, action: PostNextPage) {

        const { paginationState } = ctx.getState();
        let { pageSize, last, pagination_count, prev_start_at, first } = paginationState;
        console.log(last, first);
        return this.posts.queryCollection(ref => ref.orderBy('createDate', 'desc').startAfter(first).limit(pageSize))
            .get().pipe(
                tap(models => {
                    let next = false;
                    const currentSize = models.docs.length;

                    console.log(models);

                    if (!currentSize) {
                        next = true;
                        return;
                    }

                    const first = models.docs[0].id;
                    const last = models.docs[currentSize - 1].id;
                    let items = [];
                    for (let it of models.docs) {
                        items.push(it.data());
                    }
                    pagination_count++;
                    const prevStartAt = [...prev_start_at, first];
                    next = false;

                    console.log(items);
                    
                    const newPaginationState = { ...paginationState, next, first, last, items, pagination_count, prev_start_at: prevStartAt };
                    ctx.patchState({ paginationState: newPaginationState })

                })
                , catchError(error => {
                    const newPaginationState = { ...paginationState, next: false };
                    ctx.patchState({ paginationState: newPaginationState })
                    return of("INCORRECT_SEQUENCE_ERROR");
                })
            );


    }
}
