
export interface IFirebasePaginationState<T> {
    items: T[];
    first: string | firebase.firestore.QueryDocumentSnapshot;
    last: string | firebase.firestore.QueryDocumentSnapshot;
    prev_start_at: (string | firebase.firestore.QueryDocumentSnapshot)[];
    pagination_count: number;

    next: boolean;
    prev: boolean;
    pageSize: number;

}

export class FirebasePaginationStateModel<T> implements IFirebasePaginationState<T>{
    pageSize: number;
    items: T[];
    first: string | firebase.firestore.QueryDocumentSnapshot;
    last: string | firebase.firestore.QueryDocumentSnapshot;
    prev_start_at: (string | firebase.firestore.QueryDocumentSnapshot)[];
    pagination_count: number;
    next: boolean;
    prev: boolean;
    constructor() {
        this.items = [];
        this.first = null;
        this.last = null;
        this.prev_start_at = [];
        this.pagination_count = 0;
        this.next = false;
        this.prev = false;
        this.pageSize = 10;

    }

}
