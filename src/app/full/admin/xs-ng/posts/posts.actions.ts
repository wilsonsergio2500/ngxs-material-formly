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
  static type = '[Post] Get All Posts'
}

export class SetPostsAction {
    static type = '[Post] Set All Posts';
    constructor(public request: IPostFirebaseModel[]) { }
}

export class GetPostPageAction {
    static type = '[Posts] Get Posts Page'
}

export class PostPrevPage {
  static type = '[Posts] Get Post Previous Page'
}

export class PostNextPage {
    static type = '[Posts] Get Post Next Page';
}
