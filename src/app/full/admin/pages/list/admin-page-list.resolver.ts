import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { PageLoadItemsAction } from '../../../../states/pages/pages.actions';

@Injectable()
export class AdminPageListResolver implements Resolve<any>{

    constructor(
        private store: Store
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new PageLoadItemsAction());
        return;
    }

}
