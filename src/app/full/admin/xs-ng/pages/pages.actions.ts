import { IPaginator } from '../../../../firebase/types/firebase-pagination-inmemory';

export class PageSetAsLoadingAction {
    static type = '[Page] Set As Loading';
}

export class PageSetLoadingAsDoneAction {
    static type = '[Page] Set Loading As Done';
}

export class PageLoadItems {
    static type = '[Page] Load Items';
}

export class PageSetPaginator {
    static type = '[Page] Set Paginator';
    constructor(public paginator: IPaginator) {}
}

export class PagePaginateItems {
    static type = '[Page] Paginate Items';
}
