import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/auth/auth.state';
import { tap, take, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class LoadUserResolver implements Resolve<any>{

    constructor(
        private store: Store,
        private angularFireAuth: AngularFireAuth
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.angularFireAuth.user.pipe(
            take(1),
            mergeMap(() => this.store.selectOnce(AuthState.getUser)),
        );

    }
}
