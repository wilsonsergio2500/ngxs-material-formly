import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AdminRoleComponent } from './admin-role.component';
import { AdminRoleListComponent } from './list/admin-role-list.component';

const routes: Routes = [
    <Route>{
        path: '', component: AdminRoleComponent, children: [
            <Route>{path: 'list', component: AdminRoleListComponent}
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AdminRoleRoutingModule {
}
