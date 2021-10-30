import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPostPageAction } from '@states/posts/posts.actions';

@Injectable()
export class BlogsResolver implements Resolve<void>{

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    this.store.dispatch(new GetPostPageAction());
    return;
  }

}
