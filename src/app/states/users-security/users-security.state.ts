import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { IUsersSecurityStateModel } from './users-security.model';
import {  UsersSecuritySetAsLoadingAction, UsersSecuritySetAsDoneAction, UsersSecurityCreateAction, UserSecurityLoadItemsAction, UserSecuritySetItemsAction, UserSecurityGetPageAction, UserSecurityGetNextPageAction, UserSecurityGetPreviousPageAction } from './users-security.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, mergeMap, delay, catchError } from 'rxjs/operators';
import { FirebasePaginationStateModel } from '../../firebase/types/firabes-pagination';
import { IUserSecurityFirebaseModel, ISecurityTypeInUserSecurityFirebaseModel } from '../../schemas/users/user.model';
import { UserSecurityFireStore } from '../../schemas/users/user.security.firebase';
import { Subscription, from, of } from 'rxjs';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { Logger } from '../../utils/logger';
import { Injectable } from '@angular/core';


@State<IUsersSecurityStateModel>({
    name: 'usersSecurity',
    defaults: <IUsersSecurityStateModel>{
        working: false,
        userSecurities: [],
        size: 0,
        paginationState: new FirebasePaginationStateModel<IUserSecurityFirebaseModel>()
    }
})
@Injectable()
export class UsersSecurityState {

    private userSecurity: UserSecurityFireStore;
    private GetUserSecuritySubscription: Subscription;
    constructor(
        angularFireStore: AngularFirestore,
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
    @Selector()
    static IsPaginatorEnabled(state: IUsersSecurityStateModel): boolean {
        return state.paginationState.prev || state.paginationState.next;
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

    @Action(UserSecurityLoadItemsAction)
    onGetUserSecurity(ctx: StateContext<IUsersSecurityStateModel>) {
        console.log('entered');
        if (!this.GetUserSecuritySubscription) {
            ctx.dispatch(new UsersSecuritySetAsLoadingAction());
            console.log('entry');

            this.GetUserSecuritySubscription = this.userSecurity.collection$(ref => ref.orderBy('createDate', 'desc')).pipe(
                tap(items => {
                    console.log(items);
                    ctx.dispatch(new UserSecuritySetItemsAction(items))
                }),
                delay(250),
                mergeMap(() => ctx.dispatch(new UsersSecuritySetAsDoneAction()))
            ).subscribe();

        }
    }

    @Action(UserSecuritySetItemsAction)
    onSetUserSecurityItems(ctx: StateContext<IUsersSecurityStateModel>, action: UserSecuritySetItemsAction) {
        const { request: userSecurities } = action;
        ctx.patchState({ userSecurities, size: userSecurities.length });
    }

    @Action(UserSecurityGetPageAction)
    onGetUserSecurityPage(ctx: StateContext<IUsersSecurityStateModel>) {

        const { paginationState } = ctx.getState();
        const { pageSize, orderByField } = paginationState;
        if (!this.GetUserSecuritySubscription) {
            ctx.dispatch(new UsersSecuritySetAsLoadingAction());
            this.GetUserSecuritySubscription = this.userSecurity.collection$(ref => ref.limit(pageSize).orderBy(orderByField, 'desc')).pipe(
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
                mergeMap(() => ctx.dispatch(new UsersSecuritySetAsDoneAction()))
            ).subscribe();
        }

    }

    @Action(UserSecurityGetNextPageAction)
    onGetUserSecurityNextPage(ctx: StateContext<IUsersSecurityStateModel>) {

        const { paginationState } = ctx.getState();
        let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
        return this.userSecurity.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
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

    @Action(UserSecurityGetPreviousPageAction)
    onGetUserSecurityPreviousPage(ctx: StateContext<IUsersSecurityStateModel>) {

        const { paginationState } = ctx.getState();
        let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
        return this.userSecurity.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
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
