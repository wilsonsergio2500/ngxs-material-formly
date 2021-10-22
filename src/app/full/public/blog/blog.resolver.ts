import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PostGetAction } from '@states/posts/posts.actions';

@Injectable()
export class BlogResolver implements Resolve<void>{

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    const { url } = route.params;
    if (url) {
      this.store.dispatch(new PostGetAction(url));
    }
    return;
  }

}
