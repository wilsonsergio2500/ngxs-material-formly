
export interface IFirebasePaginationState<T> {
    items: T[];
    begining: string | number;
    first: string | number;
    last: string | number;
    prev_start_at: any[];
    pagination_count: number;

    next: boolean;
    prev: boolean;
    pageSize: number;
    orderByField: string;

}
const orderByField = 'createDate';
export class FirebasePaginationStateModel<T> implements IFirebasePaginationState<T>{
    items: T[];
    begining: string | number;
    first: string | number;
    last: string | number;
    prev_start_at: any[];
    pagination_count: number;
    next: boolean;
    prev: boolean;
    orderByField: string;
    constructor(public pageSize = 10) {
        this.items = [];
        this.begining = null;
        this.first = null;
        this.last = null;
        this.prev_start_at = [];
        this.pagination_count = 0;
        this.next = false;
        this.prev = false;
        this.orderByField = orderByField;

    }

}
