import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { PublicComponent } from './public.component';
import { PageComponent } from './page/page.component';
import { PageResolver } from './page/page.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicResolver } from './public.resolver';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsResolver } from './blogs/blogs.resolver';
import { BlogComponent } from './blog/blog.component';
import { BlogResolver } from './blog/blog.resolver';

const routes: Routes = [
  <Route>{
    path: '', component: PublicComponent, resolve:{ action: PublicResolver},
    children: [
      <Route>{ path: 'error/page-not-found', component: NotFoundComponent },
      <Route>{ path: 'blogs', component: BlogsComponent, resolve: { action: BlogsResolver } },
      <Route>{ path: 'blog/:url', component: BlogComponent, resolve: { action: BlogResolver}},
      <Route>{ path: ':url', component: PageComponent, resolve: { action: PageResolver } },
      <Route>{ path: '', component: PageComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
