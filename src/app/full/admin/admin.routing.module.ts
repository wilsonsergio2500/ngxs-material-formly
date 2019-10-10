import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    <Route>{ path: '', component: AdminComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
