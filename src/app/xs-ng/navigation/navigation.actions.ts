import { INavigationFirebaseModel } from '../../schemas/navigations/navigation.model';

export class NavigationSetAsLoadingAction {
  static type = '[Navigation] Set As Working';
}

export class NavigationSetLoadingAsDoneAction {
  static type = '[Navigation] Set As Done';
}

export class NavigationCreateAction {
    static type = '[Navigation] Set Create Item';
    constructor(public request: INavigationFirebaseModel) { }
}

export class NavigationLoadItemsAction {
    static type = '[Navigation] Load Items';
}

