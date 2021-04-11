import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AdminNavigationListComponent } from './list/admin-navigation-list.component';
import { AdminNavigationComponent } from './admin-navigation.component';
import { AdminNavigationListResolver } from './list/admin-navigation-list.resolver';

const routes: Routes = [
    <Route>{
        path: '', component: AdminNavigationComponent, children: [
            <Route>{ path: '', component: AdminNavigationListComponent, resolve: { action: AdminNavigationListResolver } },
            <Route>{ path: 'list', component: AdminNavigationListComponent, resolve: { action: AdminNavigationListResolver} }
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
