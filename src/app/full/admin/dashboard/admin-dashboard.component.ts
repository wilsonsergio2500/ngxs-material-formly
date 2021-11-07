import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '@states/auth/auth.state';
import { IAppPrivileges } from '@states/auth/auth.model';

@Component({
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html',
    styleUrls: [`admin-dashboard.component.scss`]
  })
  export class AdminDashboardComponent {

  @Select(AuthState.getPrivileges) privileges$: Observable<IAppPrivileges>;
  
  } 
