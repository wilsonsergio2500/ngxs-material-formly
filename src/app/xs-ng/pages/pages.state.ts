import { State, StateContext, Action, Store, Selector } from "@ngxs/store";
import { IPageStateModel } from './pages.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageSetAsLoadingAction, PageSetLoadingAsDoneAction, PageLoadItemsAction, PageSetPaginator, PagePaginateItems, PageCreateAction, PageGetCurrentPageAction, PageSearchItemsByTitleAction, PageSearchClearItemsAction } from './pages.actions';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { Subscription, from, of, observable, Observable, empty } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationInMemoryStateModel } from '../../firebase/types/firebase-pagination-inmemory';
import { PageFireStore } from '../../schemas/pages/page.firebase';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { IPageFirebaseModel } from '../../schemas/pages/page.model';
import { AuthState } from '../auth/auth.state';
import { searchLike } from '../../firebase/utils/search-like';

@State<IPageStateModel>({
    name: 'pagesState',
    defaults: <IPageStateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<IPageFirebaseModel>(),
        current: null,
        pageFilterByTitle: []
    }
})
export class PageState {

    private pages: PageFireStore;
    private subscription: Subscription;
    constructor(
        private angularFireStore: AngularFirestore,
        private store: Store,
        private snackBarStatus: SnackbarStatusService
    ) {
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

    @Selector()
    static getCurrentPage(state: IPageStateModel) {
        return state.current;
    }
    @Selector()
    static getPageFilterByTitle(state: IPageStateModel) {
        return state.pageFilterByTitle;
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
            this.subscription = this.pages.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
                tap(items => {
                    const newPaginationState = { ...paginationState, items };
                    ctx.patchState({ paginationState: newPaginationState });
                }),
                mergeMap(() => ctx.dispatch(new PageSetPaginator({ ...paginator }))),
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

    @Action(PageGetCurrentPageAction)
    onGetPAge(ctx: StateContext<IPageStateModel>, action: PageGetCurrentPageAction) {
        ctx.dispatch(new PageSetAsLoadingAction())
        return from(this.pages.queryCollection(ref => ref.where('url', '==', action.pageUrl)).get()).pipe(
            mergeMap(page => {
                const current = page.docs[0].data() as IPageFirebaseModel;
                ctx.patchState({ current });
                ctx.dispatch(new PageSetLoadingAsDoneAction())
                return of(page);
            }),
            catchError(() => {
                ctx.dispatch(new Navigate(['error/page-not-found']));
                return of('404-Page-Not-Found');
            })
        )
    }

    @Action(PageSearchItemsByTitleAction)
    onFindPage(ctx: StateContext<IPageStateModel>, action: PageSearchItemsByTitleAction) {
        const { searchTitle } = action;
        console.log(searchTitle);
        return from(this.pages.queryCollection(ref => searchLike(ref, 'title', searchTitle)).get()).pipe(
            mergeMap(models => {
                const has = models.docs.length;
                if (has) {
                    const pageFilterByTitle = models.docs.map(g => g.data() as IPageFirebaseModel);
                    console.log(pageFilterByTitle);
                    ctx.patchState({ pageFilterByTitle });
                    return empty();
                }
                return ctx.dispatch(new PageSearchClearItemsAction())
            })

        )
    }

    @Action(PageSearchClearItemsAction)
    onClearSearch(ctx: StateContext<IPageStateModel>) {
        ctx.patchState({ pageFilterByTitle: [] })
    }

}
