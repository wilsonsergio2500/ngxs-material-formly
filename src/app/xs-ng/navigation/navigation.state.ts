import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { INavigationStateModel } from './navigation.model';
import { NavigationLoadItemsAction, NavigationSetLoadingAsDoneAction, NavigationSetAsLoadingAction, NavigationCreateAction } from './navigation.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirebasePaginationInMemoryStateModel } from '../../firebase/types/firebase-pagination-inmemory';
import { INavigationFirebaseModel } from '../../schemas/navigations/navigation.model';
import { NavigationFireStore } from '../../schemas/navigations/navigation.firebase';
import { Subscription, from } from 'rxjs';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '../auth/auth.state';


@State<INavigationStateModel>({
    name: 'navigation',
    defaults: <INavigationStateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<INavigationFirebaseModel>(),
        current:null
      }
})
 @Injectable()
export class NavigationState {

    private navigations: NavigationFireStore;
    private subscription: Subscription;
    NAVIGATION_ROOT_DOC_ID = "naviation-root";
    constructor(
      private angularFireStore: AngularFirestore,
      private store: Store,
      private snackBarStatus: SnackbarStatusService
    ){
        this.navigations = new NavigationFireStore(angularFireStore);
    }

    @Selector()
    static IsLoading(state: INavigationStateModel) {
        return state.loading;
    }

    @Selector()
    static getPage(state: INavigationStateModel) {
        return state.paginationState.page;
    }

    @Selector()
    static getPageSize(state: INavigationStateModel) {
        return state.paginationState.paginator.pageSize;
    }

    @Selector()
    static getCollectionTotalSize(state: INavigationStateModel) {
        return state.paginationState.items.length;
    }
    @Selector()
    static getAllPages(state: INavigationStateModel) {
        return state.paginationState.items;
    }
    @Selector()
    static getNavigationItem(state: INavigationStateModel) {
        return state.paginationState.items;
    }

    @Selector()
    static getCurrentPage(state: INavigationStateModel) {
        return state.current;
    }

  @Action(NavigationSetLoadingAsDoneAction)
  onDone(ctx: StateContext<INavigationStateModel>) {
    ctx.patchState({ loading: false });
    }

  @Action(NavigationSetAsLoadingAction)
  onLoading(ctx: StateContext<INavigationStateModel>) {
    ctx.patchState({ loading: true });
    }

    @Action(NavigationCreateAction)
    onCreateNavigation(ctx: StateContext<INavigationStateModel>, action: NavigationCreateAction) {
        const { paginationState } = ctx.getState();

        return this.store.selectOnce(AuthState.getUser).pipe(
            mergeMap((user) => {
                const form = { ...action.request };
                form.createDate = Date.now();
                form.createdBy = user;
                return from(this.navigations.createWithId(this.NAVIGATION_ROOT_DOC_ID, form))
            }),
            tap(() => {
                this.snackBarStatus.OpenComplete('Navigation Updated Succesfully');
            })
        );
    }

    @Action(NavigationLoadItemsAction)
    onLoadItems(ctx: StateContext<INavigationStateModel>) {
        const { paginationState } = ctx.getState();
        const { orderByField } = paginationState;
        if (!this.subscription) {
            ctx.dispatch(new NavigationSetAsLoadingAction());
            this.subscription = this.navigations.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
                tap(items => {
                    const newPaginationState = { ...paginationState, items };
                    ctx.patchState({ paginationState: newPaginationState });
                }),
                mergeMap(() => ctx.dispatch(new NavigationSetLoadingAsDoneAction()))
            ).subscribe();
        }
    }

}
