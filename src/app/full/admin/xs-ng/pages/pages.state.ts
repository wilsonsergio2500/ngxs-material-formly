import { State, StateContext, Action, Store, Selector } from "@ngxs/store";
import { IPageStateModel } from './pages.model';
import { FirebasePaginationInMemoryStateModel } from '../../../../firebase/types/firebase-pagination-inmemory';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { PageFireStore } from '../../../../schemas/pages/page.firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageSetAsLoadingAction, PageSetLoadingAsDoneAction, PageLoadItemsAction, PageSetPaginator, PagePaginateItems, PageCreateAction } from './pages.actions';
import { LoadingStateActions } from '../../../../xs-ng/base/loading-state-actions/loading-state-actions';
import { tap, mergeMap } from 'rxjs/operators';
import { Subscription, from } from 'rxjs';
import { SnackbarStatusService } from '../../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { Navigate } from '@ngxs/router-plugin';
import { AuthState } from '../../../../xs-ng/auth/auth.state';

@State<IPageStateModel>({
    name: 'pagesState',
    defaults: <IPageStateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<IPageFirebaseModel>()
        
    }
})
export class PageState  {

    private pages: PageFireStore;
    private subscription: Subscription;
    constructor(
        private angularFireStore: AngularFirestore,
        private store: Store,
        private snackBarStatus: SnackbarStatusService
    )  {
        this.pages = new PageFireStore(angularFireStore);
    }

    @Selector()
    static IsLoading(state: IPageStateModel) {
        return state.loading;
    }

    @Selector()
    static getPage(state: IPageStateModel) {
        return state.paginationState.page;
    }

    @Selector()
    static getPageSize(state: IPageStateModel) {
        return state.paginationState.paginator.pageSize;
    }

    @Selector()
    static getCollectionTotalSize(state: IPageStateModel) {
        return state.paginationState.items.length;
    }

    @Action(PageSetAsLoadingAction)
    onLoading(ctx: StateContext<IPageStateModel>) {
        ctx.patchState({ loading: true });
    }

    @Action(PageSetLoadingAsDoneAction)
    onLoadingDone(ctx: StateContext<IPageStateModel>) {
        ctx.patchState({ loading: false });
    }

    @Action(PageCreateAction)
    onPageCreate(ctx: StateContext<IPageFirebaseModel>, action: PageCreateAction) {
        return this.store.selectOnce(AuthState.getUser).pipe(
            mergeMap((user) => {
                const form = { ...action.request };
                form.createDate = Date.now();
                form.createdBy = user;
                return from(this.pages.create(form))
            }),
            tap(() => {
                this.snackBarStatus.OpenComplete('Page Succesfully Created');
                ctx.dispatch(new Navigate(['admin/pages/list']));
            })
        );
    }

    @Action(PageLoadItemsAction)
    onLoadItems(ctx: StateContext<IPageStateModel>) {
        const { paginationState } = ctx.getState();
        const { orderByField, paginator } = paginationState;
        if (!this.subscription) {
           ctx.dispatch(new PageSetAsLoadingAction());
           this.subscription =  this.pages.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
                tap(items => {
                    const newPaginationState = { ...paginationState, items };
                    ctx.patchState({ paginationState: newPaginationState });
                }),
               mergeMap(() => ctx.dispatch(new PageSetPaginator({ ...paginator}))),
               mergeMap(() => ctx.dispatch(new PageSetLoadingAsDoneAction()))
            ).subscribe();
        }
    }

    @Action(PageSetPaginator)
    onSetPaginate(ctx: StateContext<IPageStateModel>, action: PageSetPaginator) {
        let { paginationState } = ctx.getState();
        let { paginator } = action;

        paginationState = { ...paginationState, paginator };
        ctx.patchState({ paginationState });
        return ctx.dispatch(new PagePaginateItems());
    }

    @Action(PagePaginateItems)
    onPaginate(ctx: StateContext<IPageStateModel>) {
        let { paginationState } = ctx.getState();
        let { paginator } = paginationState;
        let items = [...paginationState.items];
        const page = items.splice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);

        paginationState = { ...paginationState, page };
        ctx.patchState({ paginationState });
    }


    //public OnLoading(ctx: StateContext<IPageStateModel>) {
    //    throw new Error("Method not implemented.");
    //}
    //public OnDone(ctx: StateContext<IPageStateModel>) {
    //    throw new Error("Method not implemented.");
    //}
}
