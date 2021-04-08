import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { IUsersStateModel } from './users.model';
import { tap, mergeMap, delay, catchError } from 'rxjs/operators';
import { from, Subscription, of } from 'rxjs';
import { FirebasePaginationStateModel } from '../../firebase/types/firabes-pagination';
import { IUserFirebaseModel } from '../../schemas/users/user.model';
import { UserFireStore } from '../../schemas/users/user.firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { UserSetAsDoneAction, UserSetAsLoadingAction, UserCreateAction, UserLoadItemsAction, UserSetElementsAction, UserGetPageAction, UserGetNextPageAction, UserGetPreviousPageAction } from './users.actions';
import { Logger } from '../../utils/logger';

@State<IUsersStateModel>({
    name: 'users',
    defaults: <IUsersStateModel>{
        working: false,
        users: [],
        size: 0,
        paginationState: new FirebasePaginationStateModel<IUserFirebaseModel>()
    }
})
export class UsersState {

    private users: UserFireStore;
    private GetUserSubscription: Subscription;
    constructor(
        angularFireStore: AngularFirestore,
        private snackBarStatus: SnackbarStatusService
    ) {
        this.users = new UserFireStore(angularFireStore);
    }

    @Selector()
    static IsLoading(state: IUsersStateModel): boolean {
        return state.working;
    }

    @Selector()
    static getItems(state: IUsersStateModel): any[] {
        return state.users;
    }

    @Selector()
    static getPage(state: IUsersStateModel) {
        return state.paginationState.items;
    }
    @Selector()
    static getNextEnabled(state: IUsersStateModel) {
        return state.paginationState.next;
    }
    @Selector()
    static getPreviousEnabled(state: IUsersStateModel) {
        return state.paginationState.prev;
    }

    @Action(UserSetAsDoneAction)
    onDone(ctx: StateContext<IUsersStateModel>) {
        ctx.patchState({
            working: false
        });
    }

    @Action(UserSetAsLoadingAction)
    onLoading(ctx: StateContext<IUsersStateModel>) {
        ctx.patchState({
            working: true
        });
    }

    @Action(UserCreateAction)
    onUserCreate(ctx: StateContext<IUsersStateModel>, action: UserCreateAction) {

        const createDate = Date.now();
        const form = { ...action.request, createDate };

        return from(this.users.createWithId(form.Id, form)).pipe(
            tap(_ => this.snackBarStatus.OpenComplete('User succesfully created'))
        );

    }

    @Action(UserLoadItemsAction)
    onGetUsers(ctx: StateContext<IUsersStateModel>) {

        if (!this.GetUserSubscription) {
            ctx.dispatch(new UserSetAsLoadingAction());

            this.GetUserSubscription = this.users.collection$(ref => ref.orderBy('createDate', 'desc')).pipe(
                tap(items => {
                    ctx.dispatch(new UserSetElementsAction(items))
                }),
                delay(250),
                mergeMap(() => ctx.dispatch(new UserSetAsDoneAction()))
            ).subscribe();

        }
    }

    @Action(UserSetElementsAction)
    onSetUsers(ctx: StateContext<IUsersStateModel>, action: UserSetElementsAction) {
        const { request: users } = action;
        ctx.patchState({ users, size: users.length });
    }

    @Action(UserGetPageAction)
    onGetUserPage(ctx: StateContext<IUsersStateModel>) {

        const { paginationState } = ctx.getState();
        const { pageSize, orderByField } = paginationState;
        if (!this.GetUserSubscription) {
            ctx.dispatch(new UserSetAsLoadingAction());
            this.GetUserSubscription = this.users.collection$(ref => ref.limit(pageSize).orderBy(orderByField, 'desc')).pipe(
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
                mergeMap(() => ctx.dispatch(new UserSetAsDoneAction()))
            ).subscribe();
        }

    }

    @Action(UserGetNextPageAction)
    onGetNexUserPage(ctx: StateContext<IUsersStateModel>) {

        const { paginationState } = ctx.getState();
        let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
        return this.users.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
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

    @Action(UserGetPreviousPageAction)
    onPrevUserPage(ctx: StateContext<IUsersStateModel>) {
        const { paginationState } = ctx.getState();
        let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
        return this.users.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
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
