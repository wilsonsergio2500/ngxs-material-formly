import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserSecurityGetPageAction } from '../../../../states/users-security/users-security.actions';

@Injectable()
export class AdminRoleListResolver implements Resolve<void>{

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new UserSecurityGetPageAction())
        return;
    }

}
