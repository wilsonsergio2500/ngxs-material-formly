import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PostState } from '@states/posts/posts.state';
import { Observable } from 'rxjs';
import { IPostFirebaseModel } from '@firebase-schemas/posts/post.model';
import { PostNextPage, PostPrevPage } from '@states/posts/posts.actions';

@Component({
  selector: 'blogs',
  templateUrl: 'blogs.component.html',
  styleUrls: [`blogs.component.scss`]
})
export class BlogsComponent {

  @Select(PostState.IsLoading) working$: Observable<boolean>;
  @Select(PostState.getPage) records$: Observable<IPostFirebaseModel[]>;
  @Select(PostState.getNextEnabled) next$: Observable<boolean>;
  @Select(PostState.getPreviousEnabled) prev$: Observable<boolean>;
  @Select(PostState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;

  constructor(private store: Store) { }

  onNextPage() {
    this.store.dispatch(new PostNextPage())
  }

  onPrevPage() {
    this.store.dispatch(new PostPrevPage());
  }


}
