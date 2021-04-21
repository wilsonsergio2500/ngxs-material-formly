import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PageLoadItemsAction } from '../../../../states/pages/pages.actions';
import { NavigationLoadItemsAction } from '../../../../states/navigation/navigation.actions';

@Injectable()
export class AdminNavigationListResolver implements Resolve<any>{

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new NavigationLoadItemsAction());
        this.store.dispatch(new PageLoadItemsAction())
        return;
    }

}
