
import { State, Action, StateContext, Store, Selector } from '@ngxs/store'
import { IPostStateModel } from './posts.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostFireStore } from '../../../../schemas/posts/post.firebase';
import { CreatePostAction, SetPostAsDoneAction, GetPostsAction, SetPostsAction, SetPostAsLoadingAction } from './posts.actions';
import { SnackbarStatusService } from '../../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { from, Subscription } from 'rxjs';
import { tap, mergeMap, delay } from 'rxjs/operators';
import { AuthState } from '../../../../xs-ng/auth/auth.state';
import { Navigate } from '@ngxs/router-plugin';

@State({
    name: 'postState',
    defaults: <IPostStateModel>{
        working: false,
        posts: [],
        size: 0
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


}
