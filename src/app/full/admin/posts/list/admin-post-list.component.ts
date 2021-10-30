import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPostFirebaseModel } from '@firebase-schemas/posts/post.model';
import { PostState } from '@states/posts/posts.state';
import { PostNextPage, PostPrevPage, PostRemoveAction } from '@states/posts/posts.actions';

@Component({
  selector: 'admin-post-list',
  templateUrl: 'admin-post-list.component.html',
  styleUrls: ['admin-post-list.component.scss']
})
export class AdminPostListComponent {

  @Select(PostState.IsLoading) working$: Observable<boolean>;
  @Select(PostState.getPage) records$: Observable<IPostFirebaseModel[]>;
  @Select(PostState.getNextEnabled) next$: Observable<boolean>;
  @Select(PostState.getPreviousEnabled) prev$: Observable<boolean>;
  @Select(PostState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;

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

  onRemove(row: IPostFirebaseModel) {
    this.store.dispatch(new PostRemoveAction(row));
  }
}
