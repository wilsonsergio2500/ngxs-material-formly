import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PageState } from '../../../states/pages/pages.state';
import { IPageFirebaseModel } from '../../../schemas/pages/page.model';

@Component({
    selector: 'page',
    templateUrl: 'page.component.html',
    styleUrls: [`page.component.scss`]
  })
  export class PageComponent {

    @Select(PageState.IsLoading) working$: Observable<boolean>;
    @Select(PageState.getCurrentPage) page$: Observable<IPageFirebaseModel>;

    constructor(
      private store: Store
    ) {
    }
  
    
  
   
  
  } 
