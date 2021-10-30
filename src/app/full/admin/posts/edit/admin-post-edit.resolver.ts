import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesLoadAction } from '@states/images/images.actions';
import { PostGetCurrentSelectedAction } from '@states/posts/posts.actions';

@Injectable()
export class AdminPostEditResolver implements Resolve<void>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Promise<void> | Observable<void> {
    const { id } = route.params;
    this.store.dispatch(new ImagesLoadAction());
    this.store.dispatch(new PostGetCurrentSelectedAction(id));
    return;
  }

}
