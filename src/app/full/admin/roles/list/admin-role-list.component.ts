import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { UsersSecurityState } from '../../../../states/users-security/users-security.state';
import { Observable } from 'rxjs';
import { IUserSecurityFirebaseModel } from '../../../../schemas/users/user.model';

@Component({
    selector: 'admin-role-list',
    templateUrl: 'admin-role-list.component.html',
    styleUrls: [`admin-role-list.component.scss`]
  })
  export class AdminRoleListComponent {

    @Select(UsersSecurityState.IsLoading) working$: Observable<boolean>;
    @Select(UsersSecurityState.getPage) records$: Observable<IUserSecurityFirebaseModel[]>;
    @Select(UsersSecurityState.getNextEnabled) next$: Observable<boolean>;
    @Select(UsersSecurityState.getPreviousEnabled) prev$: Observable<boolean>;
    @Select(UsersSecurityState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;

    constructor() {
    }
  
  } 
