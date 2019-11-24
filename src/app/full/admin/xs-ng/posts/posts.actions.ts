import { IPostFirebaseModel } from '../../../../schemas/posts/post.model';


export class SetPostAsWorkingAction {
    static type = '[Post] Set As Working'
}
export class SetPostAsDoneAction {
    static type = '[Post] Set As Done';
}

export class CreatePostAction {
    static type = '[Post] Create'
    constructor(public request: IPostFirebaseModel) { }
}


