import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UsersSecurityState } from '../../../../states/users-security/users-security.state';
import { Observable } from 'rxjs';
import { IUserSecurityFirebaseModel } from '../../../../schemas/users/user.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IUsersSecurityTogglesOnly } from '../../../../states/users-security/users-security.model';
import { UserSecurityUpdateSecurity } from '../../../../states/users-security/users-security.actions';

type roleType = 'admin' | 'role' | 'blogger';

@Component({
  selector: 'admin-role-list',
  templateUrl: 'admin-role-list.component.html',
  styleUrls: [`admin-role-list.component.scss`],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminRoleListComponent {

  @Select(UsersSecurityState.IsLoading) working$: Observable<boolean>;
  @Select(UsersSecurityState.getPage) records$: Observable<IUserSecurityFirebaseModel[]>;
  @Select(UsersSecurityState.getNextEnabled) next$: Observable<boolean>;
  @Select(UsersSecurityState.getPreviousEnabled) prev$: Observable<boolean>;
  @Select(UsersSecurityState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;
  @Select(UsersSecurityState.IsUpdating) updating$: Observable<boolean>;

  columnsToDisplay = ['email', 'action'];
  expandedElement: any;
  saving: boolean = false;

  map = new Map<string, IUsersSecurityTogglesOnly>();

  constructor(
    private store: Store
  ) {}

  onSave(row: IUserSecurityFirebaseModel) {
    const item = this.map.get(row.Id);
    if (item) {
      this.store.dispatch(new UserSecurityUpdateSecurity({ ...item }));
      this.map.clear();
    }

  }
  toggleChange($event: MatSlideToggleChange, row: IUserSecurityFirebaseModel) {

    const obj = <IUserSecurityFirebaseModel>{};
    obj[$event.source.name as roleType] = $event.checked;

    const { editor, blogger, admin, Id } = row;

    let item = this.map.get(row.Id);
    if (item) {
      item = { ...item, ...obj }
      this.map.set(row.Id, item);
    } else {
      item = { editor, admin, blogger, Id, ...obj };
      this.map.set(row.Id, item);
    }

  }

  hasSame(row: IUserSecurityFirebaseModel) {
    const { editor, blogger, admin, Id } = row;
    const mem = this.map.get(row.Id);
    return !!mem ? (mem.editor == editor && mem.blogger == blogger && mem.admin == admin) : true;
  }

} 
