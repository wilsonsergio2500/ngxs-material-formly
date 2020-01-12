import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { PublicComponent } from './public.component';
import { PageComponent } from './page/page.component';
import { PageResolver } from './page/page.resolver';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    <Route>{
        path: '', component: PublicComponent,
        children: [
            <Route>{ path: '', component: PageComponent },
            <Route>{ path: ':url', component: PageComponent, resolve: { action: PageResolver } },
            <Route>{ path: 'error/page-not-found', component: NotFoundComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
