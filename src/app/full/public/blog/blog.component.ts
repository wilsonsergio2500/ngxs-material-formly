import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PostState } from '@states/posts/posts.state';
import { IPostFirebaseModel } from '@firebase-schemas/posts/post.model';

@Component({
    selector: 'blog',
    templateUrl: 'blog.component.html',
    styleUrls: [`blog.component.scss`]
  })
  export class BlogComponent {

  @Select(PostState.IsLoading) working$: Observable<boolean>;
  @Select(PostState.getCurrentPost) post$: Observable<IPostFirebaseModel>

   
  
  } 
