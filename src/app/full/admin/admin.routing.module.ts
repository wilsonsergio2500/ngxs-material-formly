import { NgModule } from '@angular/core';
import { canActivate, customClaims } from '@angular/fire/auth-guard';
import { Routes, Route, RouterModule } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISecurityTypeInUserSecurityFirebaseModel } from '@firebase-schemas/users/user.model';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

const hasAdminLevelPrivilege = (claims: ISecurityTypeInUserSecurityFirebaseModel) => (claims.superuser || claims.admin);
const hasSuperUserPrivilege = () => pipe(customClaims, map((claims: ISecurityTypeInUserSecurityFirebaseModel) => claims.superuser));
const hasEditorPrivilege =    () => pipe(customClaims, map((claims: ISecurityTypeInUserSecurityFirebaseModel) => hasAdminLevelPrivilege(claims) || claims.editor));
const hasBloggerPrivilege = () => pipe(customClaims, map((claims: ISecurityTypeInUserSecurityFirebaseModel) => hasAdminLevelPrivilege(claims) || claims.blogger));
const hasAnyPrivilege = () => pipe(customClaims, map((claims: ISecurityTypeInUserSecurityFirebaseModel) => hasAdminLevelPrivilege(claims) || claims.blogger || claims.editor));


const routes: Routes = [
  <Route>{
    path: '', component: AdminComponent,
    children: [
      <Route>{ path: 'posts', loadChildren: () => import('./posts/admin-post.module').then(m => m.AdminPostModule), ...canActivate(hasBloggerPrivilege) },
      <Route>{ path: 'pages', loadChildren: () => import('./pages/admin-page.module').then(m => m.AdminPageModule), ...canActivate(hasEditorPrivilege) },
    /*  <Route>{ path: 'media', loadChildren: () => import('./media/admin-media.module').then(m => m.AdminMediaModule) },*/
      <Route>{ path: 'navigation-builder', loadChildren: () => import('./navigation/admin-navigation.module').then(m => m.AdminNavigationBuilderModule), ...canActivate(hasEditorPrivilege) },
      <Route>{ path: 'roles', loadChildren: () => import('./roles/admin-role.module').then(m => m.AdminRoleModule), ...canActivate(hasSuperUserPrivilege) },
      <Route>{ path: 'images', loadChildren: () => import('./images/images.module').then(m => m.ImagesModule), ...canActivate(hasAnyPrivilege) },
      <Route>{ path: '', component: AdminDashboardComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
