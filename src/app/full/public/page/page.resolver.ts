import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { PageGetCurrentPageAction } from '../../../xs-ng/pages/pages.actions';

@Injectable()
export class PageResolver implements Resolve<any> {

    constructor(
        private store: Store
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const { url } = route.params;
        if (url) {
          this.store.dispatch(new PageGetCurrentPageAction(url));

        }
        return;
    }
}
