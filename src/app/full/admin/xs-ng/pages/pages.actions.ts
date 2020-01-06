import { IPaginator } from '../../../../firebase/types/firebase-pagination-inmemory';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';

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
