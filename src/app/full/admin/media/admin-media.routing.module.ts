import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminMediaComponent } from './admin-media.component';
import { AdminMediaListComponent } from './list/admin-media-list.component';


const routes: Routes = [
    <Route>{
        path: '', component: AdminMediaComponent, children: [
            <Route>{ path: '', component: AdminMediaListComponent, },
            <Route>{ path: 'list', component: AdminMediaListComponent, }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminMediaRoutingModule {
}
