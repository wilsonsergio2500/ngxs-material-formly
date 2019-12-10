import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PostState } from '../../xs-ng/posts/posts.state';
import { PostNextPage } from '../../xs-ng/posts/posts.actions';

@Component({
    selector: 'admin-post-list',
    templateUrl: 'admin-post-list.component.html',
    styleUrls: ['admin-post-list.component.scss']
})
export class AdminPostListComponent {

    @Select(PostState.IsLoading) working$;
    @Select(PostState.getPage) records$;

    constructor(
        private store: Store
    ) {
    }

    onNextPage() {
        console.log('to distpatch..');
        this.store.dispatch(new PostNextPage())
    }

}
