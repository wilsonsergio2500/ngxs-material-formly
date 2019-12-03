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
export class SetPostPage {
    static type = '[Posts] Set Post Page';
}

