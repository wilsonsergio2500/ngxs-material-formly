import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PageState } from '@states/pages/pages.state';
import { PageRemoveAction, PageSetPaginator } from '@states/pages/pages.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-page-list',
  templateUrl: 'admin-page-list.component.html',
  styleUrls: ['admin-page-list.component.scss']
})
export class AdminPageListComponent {

  @Select(PageState.IsLoading) working$ : Observable<boolean>;
  @Select(PageState.getPage) records$;
  @Select(PageState.getCollectionTotalSize) totalSize$;
  @Select(PageState.getPageSize) pageSize$

  constructor(private store: Store) {}

  onPageEvent($event) {
    this.store.dispatch(new PageSetPaginator($event));
  }

  onRemove(row) {
    this.store.dispatch(new PageRemoveAction(row))
  }

}
