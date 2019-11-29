import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';

import { AdminPostComponent } from './admin-post.component';
import { AdminPostCreateComponent } from './create/admin-post-create.component';
import { AdminPostListComponent } from './list/admin-post-list.component';
import { AdminPostListResolver } from './list/admin-post-list.resolver';

const routes: Routes = [
    <Route>{
        path: '', component: AdminPostComponent, children: [
            <Route>{ path: 'create', component: AdminPostCreateComponent },
            <Route>{ path: 'list', component: AdminPostListComponent, resolve: { action: AdminPostListResolver } }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPostRoutingModule {
}
