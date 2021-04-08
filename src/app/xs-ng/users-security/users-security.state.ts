import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { IUsersSecurityStateModel } from './users-security.model';
import { UsersSecurityDoneAction, UsersSecurityLoadingAction, UsersSecurityGetElements, UsersSecuritySetAsLoadingAction, UsersSecuritySetAsDoneAction, UsersSecurityCreateAction } from './users-security.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, timeout, mergeMap } from 'rxjs/operators';
import { FirebasePaginationStateModel } from '../../firebase/types/firabes-pagination';
import { IUserSecurityFirebaseModel, ISecurityTypeInUserSecurityFirebaseModel } from '../../schemas/users/user.model';
import { UserSecurityFireStore } from '../../schemas/users/user.security.firebase';
import { Subscription, from } from 'rxjs';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';


@State<IUsersSecurityStateModel>({
    name: 'usersSecurity',
    defaults: <IUsersSecurityStateModel>{
        working: false,
        userSecurities: [],
        size: 0,
        paginationState: new FirebasePaginationStateModel<IUserSecurityFirebaseModel>()
    }
})
export class UsersSecurityState {

    private userSecurity: UserSecurityFireStore;
    private GetUserSecuritySubscription: Subscription;
    constructor(
        private angularFireStore: AngularFirestore,
        private snackBarStatus: SnackbarStatusService
    ) {
        this.userSecurity = new UserSecurityFireStore(angularFireStore);
    }

    @Selector()
    static IsLoading(state: IUsersSecurityStateModel): boolean {
        return state.working;
    }

    @Selector()
    static getItems(state: IUsersSecurityStateModel): any[] {
        return state.userSecurities;
    }

    @Selector()
    static getPage(state: IUsersSecurityStateModel) {
        return state.paginationState.items;
    }
    @Selector()
    static getNextEnabled(state: IUsersSecurityStateModel) {
        return state.paginationState.next;
    }
    @Selector()
    static getPreviousEnabled(state: IUsersSecurityStateModel) {
        return state.paginationState.prev;
    }

    @Action(UsersSecuritySetAsDoneAction)
    onDone(ctx: StateContext<IUsersSecurityStateModel>) {
        ctx.patchState({
            working: false
        });
    }
    @Action(UsersSecuritySetAsLoadingAction)
    onLoading(ctx: StateContext<IUsersSecurityStateModel>) {
        ctx.patchState({
            working: true
        });
    }

    @Action(UsersSecurityCreateAction)
    onUserSecurityCreate(ctx: StateContext<IUsersSecurityStateModel>, action: UsersSecurityCreateAction) {

        const security = <ISecurityTypeInUserSecurityFirebaseModel>{
            superuser: false,
            admin: false,
            editor: false,
            blogger: false,
            moderator: false
        };

        const createDate = Date.now();
        const form = { ...action.request,  ...security, createDate };

        return from(this.userSecurity.createWithId(form.Id, form)).pipe(
            tap(_ => this.snackBarStatus.OpenComplete('User succesfully created'))
        );

    }
    
}
