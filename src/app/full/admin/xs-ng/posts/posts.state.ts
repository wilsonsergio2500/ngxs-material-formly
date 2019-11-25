
import { State, Action, StateContext, Store } from '@ngxs/store'
import { IPostStateModel } from './posts.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostFireStore } from '../../../../schemas/posts/post.firebase';
import { CreatePostAction, SetPostAsWorkingAction, SetPostAsDoneAction } from './posts.actions';
import { SnackbarStatusService } from '../../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
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

        this.store.selectOnce(AuthState.getUser).pipe(
            tap(u => console.log(u))
        ).subscribe();

        this.posts.create(action.request).then(g => {
            console.log(g);
        });

        return from(this.posts.create(action.request)).pipe(
            tap(() => {
                console.log('enter on tap');
                this.snackBarStatus.OpenComplete('Post succesfully created');
            })
        );
    }
}
