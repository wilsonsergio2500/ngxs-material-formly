import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    <Route>{
        path: '', component: AdminComponent,
        children: [
            <Route>{ path: 'posts', loadChildren: () => import('./posts/admin-post.module').then(m => m.AdminPostModule) },
            <Route>{ path: 'pages', loadChildren: () => import('./pages/admin-page.module').then(m => m.AdminPageModule) }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
