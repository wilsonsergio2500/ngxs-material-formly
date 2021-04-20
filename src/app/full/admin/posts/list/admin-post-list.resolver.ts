import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetPostsAction, GetPostPageAction } from '../../states/posts/posts.actions';

@Injectable()
export class AdminPostListResolver implements Resolve<any>{

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        this.store.dispatch(new GetPostPageAction());
        return;

    }
}
