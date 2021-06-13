import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AdminRoleComponent } from './admin-role.component';
import { AdminRoleListComponent } from './list/admin-role-list.component';
import { AdminRoleListResolver } from './list/admin-role-list.resolver';

const routes: Routes = [
    <Route>{
        path: '', component: AdminRoleComponent, children: [
            <Route>{ path: '', component: AdminRoleListComponent, resolve: { action: AdminRoleListResolver } },
            <Route>{ path: 'list', component: AdminRoleListComponent, resolve: { action: AdminRoleListResolver }}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoleRoutingModule {}
