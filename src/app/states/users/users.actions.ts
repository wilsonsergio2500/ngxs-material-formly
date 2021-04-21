import { IUserFirebaseModel } from '../../schemas/users/user.model';

export class UserSetAsLoadingAction {
    static type = '[Users] Set As Working';
  }
  
export class UserSetAsDoneAction {
    static type = '[Users] Set As Done';
}

export class UserCreateAction {
    static type = '[Users] Create';
    constructor(public request: IUserFirebaseModel) { }
}

export class UserLoadItemsAction {
    static type = '[Users] Get Elements';
}

export class UserSetElementsAction {
    static type = '[Users] Set Elements';
    constructor(public request: IUserFirebaseModel[]) { }
}

export class UserGetPageAction {
    static type = '[Users] Get Page';
}

export class UserGetNextPageAction {
    static type = '[Users] Get Next Page';
}

export class UserGetPreviousPageAction {
    static type = '[Users] Get Previous Page';
}
