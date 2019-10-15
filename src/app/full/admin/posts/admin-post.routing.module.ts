import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';

import { AdminPostComponent } from './admin-post.component';
import { AdminPostCreateComponent } from './create/admin-post-create.component';

const routes: Routes = [
    <Route>{
        path: '', component: AdminPostComponent, children: [
            <Route>{ path: 'create', component: AdminPostCreateComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPostRoutingModule {
}
