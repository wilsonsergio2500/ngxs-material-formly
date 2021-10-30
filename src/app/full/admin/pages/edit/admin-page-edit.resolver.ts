import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesLoadAction } from '@states/images/images.actions';
import { PageSetCurrentIdSelectedAction } from '@states/pages/pages.actions';

@Injectable()
export class AdminPageEditResolver implements Resolve<void> {

  constructor(
    private store: Store
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    const { id } = route.params;
    this.store.dispatch(new ImagesLoadAction());
    this.store.dispatch(new PageSetCurrentIdSelectedAction(id));
    return;
  }

}
