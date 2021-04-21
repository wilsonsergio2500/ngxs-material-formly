import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class AdminRoleListResolver implements Resolve<void>{

    //constructor()

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): void | import("rxjs").Observable<void> | Promise<void> {
        throw new Error("Method not implemented.");
    }

}
