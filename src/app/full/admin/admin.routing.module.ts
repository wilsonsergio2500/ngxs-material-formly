import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  <Route>{
    path: '', component: AdminComponent,
    children: [
      <Route>{ path: 'posts', loadChildren: () => import('./posts/admin-post.module').then(m => m.AdminPostModule) },
      <Route>{ path: 'pages', loadChildren: () => import('./pages/admin-page.module').then(m => m.AdminPageModule) },
      <Route>{ path: 'media', loadChildren: () => import('./media/admin-media.module').then(m => m.AdminMediaModule) },
      <Route>{ path: 'navigation-builder', loadChildren: () => import('./navigation/admin-navigation.module').then(m => m.AdminNavigationBuilderModule) },
      <Route>{ path: 'roles', loadChildren: () => import('./roles/admin-role.module').then(m => m.AdminRoleModule) },
      <Route>{ path: 'images', loadChildren: () => import('./images/images.module').then(m => m.ImagesModule) }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
