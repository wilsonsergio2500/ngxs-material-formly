import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { ImagesOnResizerLoadAction } from "../../../../states/media/images-on-resizer/images-on-resizer.actions";

@Injectable()
export class AdminPageCreateResolver {
  constructor(
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new ImagesOnResizerLoadAction());
    return;
  }
}
