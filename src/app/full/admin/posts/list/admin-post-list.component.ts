import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { PostState } from '../../xs-ng/posts/posts.state';

@Component({
    selector: 'admin-post-list',
    templateUrl: 'admin-post-list.component.html',
    styleUrls: ['admin-post-list.component.scss']
})
export class AdminPostListComponent {

    @Select(PostState.IsLoading) working$;
    @Select(PostState.getPage) records$;
}
