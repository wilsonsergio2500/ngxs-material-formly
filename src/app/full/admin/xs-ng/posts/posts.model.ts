import { IPostFirebaseModel } from '../../../../schemas/posts/post.model';
import { IFirebasePaginationState } from '../../../../firebase/types/firabes-pagination';

export interface IPostStateModel {
    working: boolean;
    posts: IPostFirebaseModel[];
    size: number;
    paginationState: IFirebasePaginationState<IPostFirebaseModel>
}
