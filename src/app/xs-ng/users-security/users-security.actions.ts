import { IUserSecurityFirebaseModel } from '../../schemas/users/user.model';

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

