import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageListComponent } from './list/admin-page-list.component';
import { AdminPageCreateComponent } from './create/admin-page-create.component';
import { AdminPageListResolver } from './list/admin-page-list.resolver'
import { AdminPageCreateResolver } from './create/admin-page-create.resolver';


const routes: Routes = [
    <Route>{
        path: '', component: AdminPageComponent, children: [
        <Route>{ path: 'create', component: AdminPageCreateComponent, resolve: { action : AdminPageCreateResolver} },
            <Route>{ path: 'list', component: AdminPageListComponent, resolve: { action : AdminPageListResolver } }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule 
    ]
})
export class AdminPageRoutingModule {}
