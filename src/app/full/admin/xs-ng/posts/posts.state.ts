
import { State, Action, StateContext, Store } from '@ngxs/store'
import { IPostStateModel } from './posts.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostFireStore } from '../../../../schemas/posts/post.firebase';
import { CreatePostAction, SetPostAsWorkingAction, SetPostAsDoneAction } from './posts.actions';
import { SnackbarStatusService } from '../../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { from } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { AuthState } from '../../../../xs-ng/auth/auth.state';

@State({
    name: 'postState',
    defaults: <IPostStateModel>{
        working: false
    }
})
export class PostState {

    private posts: PostFireStore;
    constructor(
        angularFireStore: AngularFirestore,
        private store: Store,
        private snackBarStatus: SnackbarStatusService
    ) {
        this.posts = new PostFireStore(angularFireStore);
    }

    @Action(SetPostAsWorkingAction)
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
                form.createDate = Date.now().toString();
                form.createdBy = user;
                return from(this.posts.create(form))
            }),
            tap(() => {
                this.snackBarStatus.OpenComplete('Post succesfully created');
            })
        );

    }
}
