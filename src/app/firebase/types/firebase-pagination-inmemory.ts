export interface IPaginator {
    pageIndex: number;
    pageSize: number;

}

export interface IFirebasePaginationInMemoryState<T> {

    items: T[];
    page: T[];
    orderByField: string;
    paginator: IPaginator
}

export class FirebasePaginationInMemoryStateModel<T> implements IFirebasePaginationInMemoryState<T>{
    paginator: IPaginator;
    items: T[];
    page: T[];
    pageSize: number;
    orderByField: string;
    constructor() {
        this.items = [];
        this.page = [];
        this.paginator = <IPaginator>{ pageIndex: 0, pageSize: 10 };
        this.orderByField = 'createDate';
    }

}
