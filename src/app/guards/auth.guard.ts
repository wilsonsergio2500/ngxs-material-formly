import { AuthState } from '../states/auth/auth.state';
import { RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../states/auth/auth.model'
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoginFail } from '../states/auth/auth.actions';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    @Select(AuthState.getUser) user$: Observable<User | undefined>;

    constructor(private store: Store) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        //return this.store.selectOnce(AuthState.getUser).pipe(
        //    map(u => {
        //        if (u) {
        //            console.log('found user');
        //            return true;
        //        }
        //        this.store.dispatch(new LoginFail());
        //        return false;
        //    })
        //)
        //console.log(this.)

        this.store.selectOnce(AuthState.getUser).pipe(tap(u => console.log(u))).subscribe();

        return true;
        //return this.user$.pipe(
        //    map(u => {
        //        if (!u) {
        //            this.store.dispatch(new LoginFail());
        //        }
        //        return true;
        //    })
        //);
    }
}
