import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AdminNavigationListComponent } from './list/admin-navigation-list.component';
import { AdminNavigationComponent } from './admin-navigation.component';

const routes: Routes = [
    <Route>{
        path: '', component: AdminNavigationComponent, children: [
            <Route>{ path: '', component: AdminNavigationListComponent },
            <Route>{ path: 'list', component: AdminNavigationListComponent }
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
export class AdminNavigationBuilderRoutingModule {}
