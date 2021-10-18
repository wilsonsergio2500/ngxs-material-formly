import { IPageFirebaseModel } from '../../schemas/pages/page.model';
import { IPaginator } from '../../firebase/types/firebase-pagination-inmemory';

export class PageSetAsLoadingAction {
    static type = '[Page] Set As Loading';
}

export class PageSetLoadingAsDoneAction {
    static type = '[Page] Set Loading As Done';
}

export class PageLoadItemsAction {
    static type = '[Page] Load Items';
}

export class PageCreateAction {
    static type = '[Page] Create Page'
    constructor(public request: IPageFirebaseModel ) {}
}

export class PageSetPaginator {
    static type = '[Page] Set Paginator';
    constructor(public paginator: IPaginator) {}
}

export class PagePaginateItems {
    static type = '[Page] Paginate Items';
}

export class PageGetCurrentPageAction {
    static type = '[Page] Get Current Page';
    constructor(public pageUrl: string) { }
}

export class PageSearchItemsByTitleAction {
    static type = '[Page] Search Pages By Title';
    constructor(public searchTitle: string) { }
}
export class PageSearchClearItemsAction {
    static type = '[Page] Search Pages Clear';
}

export class PageRemoveAction {
  static type = '[Page] Remove Action';
  constructor(public page: IPageFirebaseModel) { }
}

export class PageSetCurrentIdSelectedAction {
  static type = '[Page] Set Current Id Selected Action';
  constructor(public id: string) { }
}

export class PageUpdateAction {
  static type = '[Page] Update Action';
  constructor(public request: IPageFirebaseModel) {}
}



