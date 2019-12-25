
export interface IFirebasePaginationInMemoryState<T> {

    items: T[];
    page: T[];
    pageSize: number;
    orderByField: string;

}

export class FirebasePaginationInMemoryStateModel<T> implements IFirebasePaginationInMemoryState<T>{
    items: T[];
    page: T[];
    pageSize: number;
    orderByField: string;
    constructor() {
        this.items;
        this.page = [];
    }

}
