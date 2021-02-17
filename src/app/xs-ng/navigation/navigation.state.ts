import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { INavigationStateModel } from './navigation.model';
import { NavigationDoneAction, NavigationLoadingAction, NavigationGetElements } from './navigation.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, timeout, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirebasePaginationInMemoryStateModel } from '../../firebase/types/firebase-pagination-inmemory';
import { INavigationFirebaseModel } from '../../schemas/navigations/navigation.model';
import { NavigationFireStore } from '../../schemas/navigations/navigation.firebase';
import { Subscription } from 'rxjs';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';


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

    private pages: NavigationFireStore;
    private subscription: Subscription;
    constructor(
      private angularFireStore: AngularFirestore,
      private store: Store,
      private snackBarStatus: SnackbarStatusService
    ){
      this.pages = new NavigationFireStore(angularFireStore);
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
    static getCurrentPage(state: INavigationStateModel) {
        return state.current;
    }

  @Action(NavigationDoneAction)
  onDone(ctx: StateContext<INavigationStateModel>) {
    ctx.patchState({
      loading: false
    });
  }
  @Action(NavigationLoadingAction)
  onLoading(ctx: StateContext<INavigationStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  //@Action(NavigationGetElements)
  //getElements(ctx: StateContext<INavigationStateModel>){
  //  return ctx.dispatch(new NavigationLoading()).pipe(
  //      mergeMap(() => this.httpClient.get(`${environment.api.target}name/items`)),
  //      tap((records : any[]) => {
  //          ctx.patchState({
  //              records
  //            });
  //      }),
  //      mergeMap(() => ctx.dispatch(new  NavigationDoneAction()))
  //  )
  //}

}
