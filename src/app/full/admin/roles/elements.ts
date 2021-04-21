
import { AdminRoleComponent } from './admin-role.component';
import { AdminRoleListComponent } from './list/admin-role-list.component';
import { AdminRoleListResolver } from './list/admin-role-list.resolver';


export function getAdminComponents() {
    return [
        AdminRoleComponent,
        AdminRoleListComponent
    ];
}

export function getProviders() {
    return [
        AdminRoleListResolver
    ]
}
