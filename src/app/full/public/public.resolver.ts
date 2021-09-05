import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { NavigationLoadItemsAction } from '@states/navigation/navigation.actions';

@Injectable()
export class PublicResolver implements Resolve<any>{

  constructor(
    private store: Store
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new NavigationLoadItemsAction());
    return;
  }

}
