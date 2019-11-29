import { IPostFirebaseModel } from '../../../../schemas/posts/post.model';

export interface IPostStateModel {
    working: boolean;
    posts: IPostFirebaseModel[];
    size: number;
}
