import { IUserSecurityFirebaseModel } from '../../schemas/users/user.model';
import { IUsersSecurityTogglesOnly } from './users-security.model';

export class UsersSecuritySetAsLoadingAction {
  static type = '[Users Security] Set As Working';
}

export class UsersSecuritySetAsDoneAction {
  static type = '[Users Security] Set As Done';
}

export class UsersSecurityCreateAction {
    static type = '[Users Security] Create';
    constructor(public request: IUserSecurityFirebaseModel) { }
}

export class UserSecurityLoadItemsAction {
    static type = '[Users Security] Get Items';
}

export class UserSecuritySetItemsAction {
    static type = '[Users Security] Set Items';
    constructor(public request: IUserSecurityFirebaseModel[]) { }
}

export class UserSecurityGetPageAction {
    static type = '[Users Security] Get Page';
}

export class UserSecurityGetNextPageAction {
    static type = '[Users Security] Get Next Page';
}

export class UserSecurityGetPreviousPageAction {
    static type = '[Users Security] Get Previous Page';
}

export class UserSecurityUpdateSecurity {
  static type = '[Users Security] Update Security';
  constructor(public request: IUsersSecurityTogglesOnly) { }
}
