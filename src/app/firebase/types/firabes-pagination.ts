
export interface IFirebasePaginationState<T> {
    items: T[];
    first: string | number;
    last: string | number;
    prev_start_at: any[];
    pagination_count: number;

    next: boolean;
    prev: boolean;
    pageSize: number;
    orderByField: string;

}

export class FirebasePaginationStateModel<T> implements IFirebasePaginationState<T>{
    pageSize: number;
    items: T[];
    first: string | number;
    last: string | number;
    prev_start_at: any[];
    pagination_count: number;
    next: boolean;
    prev: boolean;
    orderByField: string;
    constructor() {
        this.items = [];
        this.first = null;
        this.last = null;
        this.prev_start_at = [];
        this.pagination_count = 0;
        this.next = false;
        this.prev = false;
        this.pageSize = 10;
        this.orderByField = 'createDate' ;

    }

}
