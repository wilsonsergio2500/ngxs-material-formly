import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PostState } from '../../states/posts/posts.state';
import { PostNextPage, PostPrevPage } from '../../states/posts/posts.actions';

@Component({
    selector: 'admin-post-list',
    templateUrl: 'admin-post-list.component.html',
    styleUrls: ['admin-post-list.component.scss']
})
export class AdminPostListComponent {

    @Select(PostState.IsLoading) working$;
    @Select(PostState.getPage) records$;

    @Select(PostState.getNextEnabled) next$;
    @Select(PostState.getPreviousEnabled) prev$;


    constructor(
        private store: Store
    ) {
    }

    onNextPage() {
        this.store.dispatch(new PostNextPage())
    }

    onPrevPage() {
        this.store.dispatch(new PostPrevPage());
    }
}
