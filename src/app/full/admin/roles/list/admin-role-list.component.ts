import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { UsersSecurityState } from '../../../../states/users-security/users-security.state';
import { Observable } from 'rxjs';
import { IUserSecurityFirebaseModel } from '../../../../schemas/users/user.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
    expandedElement: any;

    constructor() {
    }
  
  } 
