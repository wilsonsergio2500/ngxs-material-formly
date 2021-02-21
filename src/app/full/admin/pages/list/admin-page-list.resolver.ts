import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { PageLoadItemsAction } from '../../../../xs-ng/pages/pages.actions';
import { NavigationLoadItemsAction } from '../../../../xs-ng/navigation/navigation.actions';

@Injectable()
export class AdminPageListResolver implements Resolve<any>{

    constructor(
        private store: Store
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new NavigationLoadItemsAction());
        this.store.dispatch(new PageLoadItemsAction());
        return;
    }

}
