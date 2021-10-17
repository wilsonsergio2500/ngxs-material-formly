import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { ImagesLoadAction } from "@states/images/images.actions";
import { ImagesOnResizerLoadAction } from "@states/media/images-on-resizer/images-on-resizer.actions";

@Injectable()
export class AdminPageCreateResolver implements Resolve<void> {

  constructor(
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new ImagesOnResizerLoadAction());
    this.store.dispatch(new ImagesLoadAction());;
    return;
  }
}
