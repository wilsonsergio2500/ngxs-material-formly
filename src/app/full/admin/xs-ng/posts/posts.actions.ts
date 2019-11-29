import { IPostFirebaseModel } from '../../../../schemas/posts/post.model';


export class SetPostAsLoadingAction {
    static type = '[Post] Set As Loading'
}
export class SetPostAsDoneAction {
    static type = '[Post] Set As Done';
}

export class CreatePostAction {
    static type = '[Post] Create'
    constructor(public request: IPostFirebaseModel) { }
}

export class GetPostsAction {
  static type = '[Post] Get Posts'
}

export class SetPostsAction {
    static type = '[Post] Set Posts';
    constructor(public request: IPostFirebaseModel[]) { }
}


