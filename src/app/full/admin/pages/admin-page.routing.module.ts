import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageListComponent } from './list/admin-page-list.component';
import { AdminPageCreateComponent } from './create/admin-page-create.component';


const routes: Routes = [
    <Route>{
        path: '', component: AdminPageComponent, children: [
            <Route>{ path: 'create', component: AdminPageCreateComponent },
            <Route>{path: 'list', component: AdminPageListComponent }
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
