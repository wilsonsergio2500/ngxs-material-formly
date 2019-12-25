import { State, Select, StateContext, Action } from "@ngxs/store";
import { IPageStateModel } from './pages.model';
import { FirebasePaginationInMemoryStateModel } from '../../../../firebase/types/firebase-pagination-inmemory';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { PageFireStore } from '../../../../schemas/pages/page.firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageSetAsLoadingAction, PageSetLoadingAsDoneAction } from './pages.actions';
import { LoadingStateActions } from '../../../../xs-ng/base/loading-state-actions/loading-state-actions';

@State<IPageStateModel>({
    name: 'pagesState',
    defaults: <IPageStateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<IPageFirebaseModel>()
        
    }
})
export class PageState  {

    private pages: PageFireStore;
    constructor(
        private angularFireStore: AngularFirestore
    )  {
        this.pages = new PageFireStore(angularFireStore);
    }

    @Select()
    static getIsLoading(state: IPageStateModel) {
        return state.loading;
    }

    @Select()
    static getPage(state: IPageStateModel) {
        return state.paginationState.page;
    }

    @Select()
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

    //public OnLoading(ctx: StateContext<IPageStateModel>) {
    //    throw new Error("Method not implemented.");
    //}
    //public OnDone(ctx: StateContext<IPageStateModel>) {
    //    throw new Error("Method not implemented.");
    //}
}
